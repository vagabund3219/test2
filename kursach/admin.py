from django.contrib import admin
from .models import *
# Register your models here.

class TypeOfTranscationAdmin(admin.ModelAdmin):
    list_display = ('id', 'type_name')


class TransactionsAdmin(admin.ModelAdmin):
    list_display = ('id', 'date','name', 'price', 'category', 'type', 'user', 'username')
    list_filter = ('date', 'category', 'type', 'user', 'username')
    # list_editable = ('item_transaction_date','name', 'price', 'category', 'type', 'user')
    # list_max_show_all = 30
    list_per_page = 20
    ordering = ('-date', 'price')
    # raw_id_fields = ('category',)
    search_fields = ['name', 'username']
    search_help_text = "Поиск по наиманованию транзакции"

class BillAdmin(admin.ModelAdmin):
     list_display = ('id', 'sum', 'user')
     # list_filter = ('user',)
     list_editable = ('sum',)
     list_per_page = 30
     ordering = ('user', 'sum')

class CategoriesAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'user', 'type')
    list_editable = ('name', 'type')
    list_per_page = 30
    list_filter = ('user', 'name', 'type')
    ordering = ('user',)
    search_fields = ['name']

class CheckDataAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'count', 'price', 'category', 'date', 'user', 'username', 'type')
    list_filter = ('category', 'user', 'username')
    list_editable = ('category', 'name',)
    list_per_page = 30
    search_fields = ('name', 'username')
    ordering = ('user', '-date')

class NewsAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'subtitle', 'tags', 'image')
    list_filter = ('tags', )
    list_editable = ('title',)
    list_per_page = 30
    search_fields = ('title', 'description')
    ordering = ('title',)

admin.site.register(Categories, CategoriesAdmin)
admin.site.register(TypeOfTranscation, TypeOfTranscationAdmin)
admin.site.register(CheckData, CheckDataAdmin)
admin.site.register(Transactions, TransactionsAdmin)
admin.site.register(News, NewsAdmin)
admin.site.register(Bill, BillAdmin)



