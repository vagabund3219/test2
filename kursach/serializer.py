from rest_framework import serializers
from rest_framework.renderers import JSONRenderer

from .models import Transactions, Check_data, Categories, Type_of_transcation


# class TransactionsModel:
#     def __init__(self, item_transaction_date, item_name, item_price, item_category_id, item_user_id, item_type_id):
#         self.item_transaction_date = item_transaction_date
#         self.item_name = item_name
#         self.item_price = item_price
#         self.item_category_id = item_category_id
#         self.item_user_id = item_user_id
#         self.item_type_id = item_type_id
class TypeOfTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type_of_transcation
        fields = ('type_name', 'id')

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ('category_name', 'id', 'category_user_id_id')

class CheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Check_data
        fields = ('check_name', 'check_count', 'check_price', 'check_category_id', 'date', 'check_user_id')


class TransactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = ('date', 'item_name', 'item_price', 'item_category_id', 'item_user_id', 'item_type_id')
        date = serializers.DateField(format='%d.%m.%Y')
    # item_transaction_date = serializers.DateField()
    # item_name = serializers.CharField()
    # item_price = serializers.
    # item_category_id = serializers.
    # item_user_id = serializers.
    # item_type_id = serializers.

    # item_transaction_date = serializers.DateField()
    # item_name = serializers.CharField(max_length=80)
    # item_price = serializers.FloatField()
    # item_category_id_id = serializers.IntegerField()
    # item_type_id_id = serializers.IntegerField()
    # item_user_id_id = serializers.IntegerField()



    # def create(self, validated_data):
    #     return Transactions.objects.create(**validated_data)
    #
    # def update(self, instance, validated_data):
    #     instance.item_transaction_date = validated_data.get('item_transaction_date', instance.item_transaction_date)
    #     instance.item_name = validated_data.get('item_name', instance.item_name)
    #     instance.item_price = validated_data.get('item_price', instance.item_price)
    #     instance.item_category_id_id = validated_data.get('item_category_id_id', instance.item_category_id_id)
    #     instance.item_type_id_id = validated_data.get('item_type_id_id', instance.item_type_id_id)
    #     instance.item_user_id_id = validated_data.get('item_user_id_id', instance.item_user_id_id)
    #     instance.save()
    #     return instance




# def encode():
#     model = TransactionsModel('item_transaction_date: 2020-10-10', 'item_name: adadaaddaw', 'item_price: 1', 'item_category_id: 1', 'item_type_id: 1', 'item_user_id: 1')
#     model_sr = TransactionsSerializer(model)
#     print(model_sr.data)
#     json = JSONRenderer().render(model_sr.data)
#     print(json)
