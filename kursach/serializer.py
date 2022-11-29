from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from .models import Transactions, CheckData, Categories, TypeOfTranscation

class TypeOfTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeOfTranscation
        fields = ('type_name', 'id')

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ('name', 'id', 'type', 'user')

class CheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckData
        fields = ('name', 'count', 'price', 'category', 'date', 'username', 'type', 'user')

class TransactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = ('date', 'name', 'price', 'category', 'type', 'username', 'user')
        # date = serializers.DateField(format='%d.%m.%Y')
