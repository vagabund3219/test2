from django.shortcuts import render, redirect
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .script_folder.checkScript import *
from .forms import Add_check_form, Add_transaction_form, AddNewCategory
from .models import Check_data, Transactions, Categories, News, Bill, Type_of_transcation
from django.views.generic import ListView, CreateView, DetailView
from .serializer import TransactionsSerializer, CheckSerializer, CategoriesSerializer, TypeOfTransactionSerializer


class NewsList(ListView):
    model = News


class NewsDetail(DetailView):
    model = News


class GetUserTransactions(ListView):
    model = Transactions

    def get_context_data(self, *args, **kwargs):
        ctx = super(GetUserTransactions, self).get_context_data(*args, **kwargs)
        ctx["item_user_id_id"] = self.request.user.id
        return ctx

    def get_queryset(self):
        return Transactions.objects.filter(item_user_id=self.request.user.id)


class AddTransactionView(CreateView):
    model = Transactions
    template_name_suffix = '_create_form'
    form_class = Add_transaction_form

    def get_form_kwargs(self, **kwargs):
        kwargs = super(AddTransactionView, self).get_form_kwargs()
        kwargs.update({'user': self.request.user.id})
        return kwargs

    def form_valid(self, form):
        form.instance.item_user_id = self.request.user
        update_bill(Bill, form, self.request.user.id)
        return super(AddTransactionView, self).form_valid(form)


class ViewCheck(ListView):
    model = Check_data

    def get_queryset(self):
        return Check_data.objects.filter(check_user_id=self.request.user.id)


class AddNewCategory(CreateView):
    model = Categories
    template_name_suffix = '_create_form'
    form_class = AddNewCategory

    def form_valid(self, form):
        form.instance.item_user_id = self.request.user.id
        form.instance.category_user_id = self.request.user
        return super(AddNewCategory, self).form_valid(form)


def send_check_view(request):
    template = 'kursach/index.html'
    if request.method == 'POST' and request.FILES:
        form = Add_check_form(request.POST, request.FILES)
        print(form.fields)
        file = request.FILES['checkImg'].read()
        # response_data = send_check(file)
        response_data = [{'item': 'Календарь-домик (Гифтман):5/60', 'price': 39.0, 'count': 1},
                         {'item': 'Фонарь аккум зар от сети TD-R15LED(СИ):12/72', 'price': 10.0, 'count': 1}]
        print(form.data)
        if response_data != None and form.is_valid():
            # and form.is_valid()
            for item in response_data:
                to_db = Check_data(check_name=item['item'], check_count=item['count'], check_price=item['price'],
                                   check_category_id_id=form.data['check_category_id'], check_user_id=request.user)
                to_db.save()
                bill = Bill.objects.get_or_create(user_id=request.user.id)
                bill[0].bill_sum -= int(item['price'])
                bill[0].save()
            return redirect('view_check')
        else:
            error = 'This is not check'
            form = Add_check_form()
            form.fields['check_category_id'].choices = [(choice.pk, choice.category_name) for choice in
                                                        Categories.objects.filter(category_user_id_id=request.user.id)]
            return render(request, template, {'form': form, 'error': error})
    # else:
    form = Add_check_form()
    form.fields['check_category_id'].choices = [(choice.pk, choice.category_name) for choice in
                                                Categories.objects.filter(category_user_id_id=request.user.id)]
    return render(request, template, {'form': form})


def main(request):
    return render(request, 'kursach/news_list.html')


def get_user_transactions(request):
    checks = Check_data.objects.filter(check_user_id=request.user.id)
    transactions = Transactions.objects.filter(item_user_id=request.user.id)
    user_id = request.user.id
    print(user_id)
    lst = sort_by_date(checks, transactions)
    return render(request, 'kursach/transactions_list.html', {'form': lst, 'user_id': user_id})
