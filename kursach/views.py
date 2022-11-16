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
        return Transactions.objects.filter(item_user_id = self.request.user.id)

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
        form = Add_check_form(request.POST['check_category_id'], request.FILES)
        file = request.FILES['checkImg'].read()
        response_data = send_check(file)
        print(form.data)
        print(form.check_category_id)

        if response_data != None and form.is_valid():
            for item in response_data:
                to_db = Check_data(check_name=item['item'], check_count=item['count'], check_price=item['price'], check_category_id=form.cleaned_data['check_category_id'], check_user_id = request.user)
                to_db.save()
                bill = Bill.objects.get_or_create(user_id=request.user.id)
                bill[0].bill_sum -= int(item['price'])
                bill[0].save()
            return redirect('view_check')
        else:
            print('eror')
            error = 'This is not check'
            form = Add_check_form(user=request.user)
            return render(request, template, {'form': form, 'error': error})
    else:
        form = Add_check_form(user=request.user)
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

class TypeOfTransactionApiList(generics.ListAPIView):
    queryset = Type_of_transcation.objects.all()
    serializer_class = TypeOfTransactionSerializer
class CategoriesApiList(generics.ListCreateAPIView):
    # queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer
    def get_queryset(self):
        user = self.request.user
        return Categories.objects.filter(category_user_id_id=user)

class TransactionsApiList(generics.ListCreateAPIView):
    queryset = Transactions.objects.all()
    serializer_class = TransactionsSerializer
class CheckApiList(generics.ListCreateAPIView):
    queryset = Check_data.objects.all()
    serializer_class = CheckSerializer
class TransactionsAPIView(APIView):
    def get(self, request):
        lst = Transactions.objects.all()
        return Response({'trans': TransactionsSerializer(lst, many=True).data})

    def post(self, request):
        serializer = TransactionsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'title': serializer.data})

    def put(self, request, *args, **kwargs):
        pk=kwargs.get('pk', None)
        if not pk:
            return Response({'error':'pk....'})

        try:
            instance = Transactions.objects.get(pk=pk)

        except:
            return Response({'error':'pk....'})

        serializer = TransactionsSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'post': serializer.data})

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if not pk:
            return Response({'error':'therei s no such pk'})

        try:
            instance = Transactions.objects.get(pk=pk)
        except:
            return  Response({'error':'there i s no such pk'})

        instance.delete()
        return Response({'post': 'delete post' + str(pk)})
