import datetime
from django.contrib.auth.models import User
from django.db import models
from django.shortcuts import reverse

class Categories(models.Model):
    name = models.CharField(max_length=80, verbose_name='Название категории')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.ForeignKey('TypeOfTranscation', on_delete=models.PROTECT)
    def get_absolute_url(self):
        return reverse('add_category')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = "Категории"

class TypeOfTranscation(models.Model):
    type_name = models.CharField(max_length=80)

    def __str__(self):
        return self.type_name

    class Meta:
        verbose_name = 'Тип транзакции'
        verbose_name_plural = "Типы транзакций"

class CheckData(models.Model):
    name = models.CharField(max_length=80)
    price = models.FloatField()
    count = models.FloatField()
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)
    date = models.DateField(default=datetime.date.today())
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.ForeignKey(TypeOfTranscation, on_delete=models.PROTECT, verbose_name='Тип')
    username = models.CharField(max_length=60, verbose_name='Кто добавил')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Чек"
        verbose_name_plural = "Чеки"


class News(models.Model):
    title = models.CharField(max_length=30,default='2')
    subtitle = models.CharField(max_length=50, default='2')
    description = models.TextField(default='2')
    image = models.ImageField(upload_to='images/%Y/%m/%d/')
    tags = models.CharField(max_length=255,default='2')
    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('full_news')

    class Meta:
        verbose_name = "Новость"
        verbose_name_plural = "Новости"

class Transactions(models.Model):
    date = models.DateField(verbose_name='Дата')
    name = models.CharField(max_length=80, verbose_name='Имя транзакции')
    price = models.FloatField(verbose_name='Цена')
    category = models.ForeignKey(Categories, on_delete=models.CASCADE, verbose_name='Категория')
    type = models.ForeignKey(TypeOfTranscation, on_delete=models.PROTECT, verbose_name='Тип')# expenses incomes
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=60, verbose_name='Кто добавил')
    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('get_user_transactions')

    class Meta:
        verbose_name = "Транзакция"
        verbose_name_plural = "Транзакции"


class Bill(models.Model):
    sum = models.FloatField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name = "Счёт"
        verbose_name_plural = "Счета"






