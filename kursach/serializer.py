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
        fields = ('name', 'id', 'type')

class CheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckData
        fields = ('name', 'count', 'price', 'category', 'date', 'username')

class TransactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = ('date', 'name', 'price', 'category', 'type', 'username')
        # date = serializers.DateField(format='%d.%m.%Y')
