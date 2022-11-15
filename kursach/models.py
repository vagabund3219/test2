import datetime
from django.contrib.auth.models import User
from django.db import models
from django.shortcuts import reverse

class Categories(models.Model):
    category_name = models.CharField(max_length=80, verbose_name='Название категории')
    category_user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    def get_absolute_url(self):
        return reverse('add_category')

    def __str__(self):
        return self.category_name

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = "Категории"

class Type_of_transcation(models.Model):
    type_name = models.CharField(max_length=80)

    def __str__(self):
        return self.type_name

    class Meta:
        verbose_name = 'Тип транзакции'
        verbose_name_plural = "Типы транзакций"

class Check_data(models.Model):
    check_name = models.CharField(max_length=80)
    check_count = models.FloatField()
    check_price = models.FloatField()
    check_category_id = models.ForeignKey(Categories, on_delete=models.CASCADE, default=1)
    date = models.DateField(default=datetime.date.today())
    check_user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.check_name

    class Meta:
        verbose_name = "Чек"
        verbose_name_plural = "Чеки"


class News(models.Model):
    news_title = models.CharField(max_length=80)
    news_date = models.DateField()
    news_text = models.TextField()

    def __str__(self):
        return self.news_title

    def get_absolute_url(self):
        return reverse('full_news')

    class Meta:
        verbose_name = "Новость"
        verbose_name_plural = "Новости"

class Transactions(models.Model):
    date = models.DateField(verbose_name='Дата')
    item_name = models.CharField(max_length=80, verbose_name='Имя')
    item_price = models.FloatField(verbose_name='Цена')
    item_category_id = models.ForeignKey(Categories, on_delete=models.CASCADE, default=1, verbose_name='Категория')
    item_type_id = models.ForeignKey(Type_of_transcation, on_delete=models.PROTECT, default=1, verbose_name='Тип')# expenses incomes
    item_user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    def __str__(self):
        return self.item_name

    def get_absolute_url(self):
        return reverse('get_user_transactions')

    class Meta:
        verbose_name = "Транзакция"
        verbose_name_plural = "Транзакции"


class Bill(models.Model):
    bill_sum = models.FloatField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name = "Счёт"
        verbose_name_plural = "Счета"






