from rest_framework import serializers
from rest_framework.renderers import JSONRenderer

from .models import Transactions, CheckData, Categories, TypeOfTranscation


# class TransactionsModel:
#     def __init__(self, item_transaction_date, name, price, category, user, type):
#         self.item_transaction_date = item_transaction_date
#         self.name = name
#         self.price = price
#         self.category = category
#         self.user = user
#         self.type = type
class TypeOfTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeOfTranscation
        fields = ('type_name', 'id')

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ('name', 'id')

class CheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckData
        fields = ('name', 'count', 'price', 'category', 'date')


class TransactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = ('date', 'name', 'price', 'category', 'type')
        date = serializers.DateField(format='%d.%m.%Y')
    # item_transaction_date = serializers.DateField()
    # name = serializers.CharField()
    # price = serializers.
    # category = serializers.
    # user = serializers.
    # type = serializers.

    # item_transaction_date = serializers.DateField()
    # name = serializers.CharField(max_length=80)
    # price = serializers.FloatField()
    # item_category_id_id = serializers.IntegerField()
    # item_type_id_id = serializers.IntegerField()
    # item_user_id_id = serializers.IntegerField()



    # def create(self, validated_data):
    #     return Transactions.objects.create(**validated_data)
    #
    # def update(self, instance, validated_data):
    #     instance.item_transaction_date = validated_data.get('item_transaction_date', instance.item_transaction_date)
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.price = validated_data.get('price', instance.price)
    #     instance.item_category_id_id = validated_data.get('item_category_id_id', instance.item_category_id_id)
    #     instance.item_type_id_id = validated_data.get('item_type_id_id', instance.item_type_id_id)
    #     instance.item_user_id_id = validated_data.get('item_user_id_id', instance.item_user_id_id)
    #     instance.save()
    #     return instance




# def encode():
#     model = TransactionsModel('item_transaction_date: 2020-10-10', 'name: adadaaddaw', 'price: 1', 'category: 1', 'type: 1', 'user: 1')
#     model_sr = TransactionsSerializer(model)
#     print(model_sr.data)
#     json = JSONRenderer().render(model_sr.data)
#     print(json)
