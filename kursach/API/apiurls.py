from django.urls import path
from .apiview import *

urlpatterns = [
    path('v1/TypeOfTransactionApiList', TypeOfTransactionApiList.as_view(), name='TransactionsAPIView'),
    path('v1/NewsApiList', NewsApiList.as_view(), name='NewsAPIView'),
    path('v1/CategoriesApiList', CategoriesApiList.as_view(), name='TransactionsAPIView'),
    path('v1/TransactionsApiList', TransactionsApiList.as_view(), name='TransactionsAPIView'),
    path('v1/transactions_list.css/<int:pk>/', TransactionsApiList.as_view()),
    path('v1/CheckApiList', CheckApiList.as_view(), name='CheckApiList'),
    path('v1/CheckApiList/<int:pk>/', CheckApiList.as_view()),
    ]