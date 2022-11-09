from django.urls import path
from .views import *

urlpatterns = [
    path('add_transaction/', AddTransactionView.as_view(), name='add_transaction'),
    path('view_check/', ViewCheck.as_view(), name='view_check'),
    path('add_category', AddNewCategory.as_view(), name='add_category'),
    path('send_check/', send_check, name='send_check'),
    path('get_user_transactions', GetUserTransactions.as_view(), name='get_user_transactions' ),
    path('', main, name='main'),
]