from django.urls import path
from .views import *

urlpatterns = [
    path('api/v1/TypeOfTransactionApiList', TypeOfTransactionApiList.as_view(), name='TransactionsAPIView'),
    path('api/v1/CategoriesApiList', CategoriesApiList.as_view(), name='TransactionsAPIView'),
    path('api/v1/transactions_list', TransactionsApiList.as_view(), name='TransactionsAPIView'),
    path('api/v1/transactions_list/<int:pk>/', TransactionsApiList.as_view()),
    path('api/v1/CheckApiList', CheckApiList.as_view(), name='CheckApiList'),
    path('api/v1/CheckApiList/<int:pk>/', CheckApiList.as_view()),
    path('news/<int:pk>', NewsDetail.as_view(), name='news_detail'),
    path('add_transaction/', AddTransactionView.as_view(), name='add_transaction'),
    path('view_check/', ViewCheck.as_view(), name='view_check'),
    path('add_category', AddNewCategory.as_view(), name='add_category'),
    path('send_check/', send_check_view, name='send_check'),
    # path('get_user_transactions', GetUserTransactions.as_view(), name='get_user_transactions' ),
    path('get_user_transactions', get_user_transactions, name='get_user_transactions' ),
    path('', NewsList.as_view(), name='main'),
]