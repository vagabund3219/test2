from django import forms
import request

from .models import Categories, Check_data, Type_of_transcation, Transactions
from kursovoiProekt import settings
# from django.contrib.auth.models import User
# class Add_check(forms.Form):
#     checkImg = forms.ImageField()

class AddNewCategory(forms.ModelForm):
    class Meta:
        model = Categories
        fields = ['category_name']
        widgets = {
            'category_name': forms.TextInput(attrs={'class': 'form-control'}),
        }


class Add_check_form(forms.ModelForm):
    class Meta:
        model = Transactions
        fields = ['check_category_id']

    checkImg = forms.ImageField(label='Чек', widget=forms.FileInput(attrs={'class': 'form-control', 'id': "formFile"}))
    check_category_id = forms.ModelChoiceField(queryset=Categories.objects.all(), empty_label="(Nothing)", label='Категория', widget=forms.Select(attrs={'class': 'form-control'}))


class Add_transaction_form(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        print(kwargs)
        self.user = kwargs.pop("user")
        super(Add_transaction_form, self).__init__(*args, **kwargs)
        item_category_id = forms.Select(choices=Categories.objects.filter(category_user_id=self.user))
        self.fields['item_category_id'] = forms.Select(choices=Categories.objects.filter(category_user_id=self.user))
        self.fields['item_category_id'].queryset = Categories.objects.filter(category_user_id=self.user)
    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     self.fields['item_category_id'] = forms.Select(choices=Categories.objects.filter(category_user_id=1))
    class Meta:
        model = Transactions
        # fields = ['date', 'item_name', 'item_price', 'item_category_id', 'item_type_id']
        fields = ['date', 'item_name', 'item_price', 'item_type_id']
        widgets = {
            'date': forms.DateInput(attrs={'class': 'form-control', 'id': 'foo', 'autocomplete':"off"}),
            'item_name': forms.TextInput(attrs={'class': 'form-control'}),
            'item_price': forms.TextInput(attrs={'class': 'form-control'}),
            # 'item_category_id': forms.Select(attrs={'class': 'form-control'}),
            'item_type_id': forms.Select(attrs={'class': 'form-control'})
        }

        #
        # def __init__(self, user, *args, **kwargs):
        #     if user:
        #         self.fields['item_category_id'].queryset = user.Categories.all(category_user_id=user.id)




