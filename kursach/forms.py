from django import forms

from .models import Categories, CheckData, TypeOfTranscation, Transactions
from kursovoiProekt import settings
# from django.contrib.auth.models import User
# class Add_check(forms.Form):
#     checkImg = forms.ImageField()

class AddNewCategory(forms.ModelForm):
    class Meta:
        model = Categories
        fields = ['name', 'type']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'type': forms.Select(attrs={'class': 'form-control'}),
        }

class AddCheckForm(forms.Form):
    # def __init__(self, user, *args, **kwargs):
    #     super(AddCheckForm, self).__init__(*args, **kwargs)
    #     # self.fields['category'].queryset = Categories.objects.filter(category_user_id_id=user)

    # class Meta:
    #     model = Transactions
        # fields = ['category']
    checkImg = forms.ImageField(label='Чек', widget=forms.FileInput(attrs={'class': 'form-control', 'id': "formFile"}))
    # category = forms.ModelChoiceField(queryset=Categories.objects.all(), empty_label="(Nothing)", label='Категория', widget=forms.Select(attrs={'class': 'form-control'}))
    category_id = forms.ModelChoiceField(queryset=Categories.objects.all(), empty_label="(Nothing)", label='Категория', widget=forms.Select(attrs={'class': 'form-control'}))
    username = forms.TextInput()

class AddTransactionForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        print(kwargs)
        self.user = kwargs.pop("user")
        super(AddTransactionForm, self).__init__(*args, **kwargs)
        item_category_id = forms.Select(choices=Categories.objects.filter(user_id=self.user))
        self.fields['category'] = forms.Select(choices=Categories.objects.filter(user_id=self.user))
        self.fields['category'].queryset = Categories.objects.filter(user_id=self.user)
    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     self.fields['category'] = forms.Select(choices=Categories.objects.filter(user=1))
    class Meta:
        model = Transactions
        # fields = ['date', 'name', 'price', 'category', 'type']
        fields = ['date', 'name', 'price', 'type', 'username']
        widgets = {
            'date': forms.DateInput(attrs={'class': 'form-control', 'id': 'foo', 'autocomplete':"off"}),
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'price': forms.TextInput(attrs={'class': 'form-control'}),
            # 'category': forms.Select(attrs={'class': 'form-control'}),
            'type': forms.Select(attrs={'class': 'form-control'}),
            'username': forms.TextInput(attrs={'class': 'form-control'})
        }

        #
        # def __init__(self, user, *args, **kwargs):
        #     if user:
        #         self.fields['category'].queryset = user.Categories.all(user=user.id)




