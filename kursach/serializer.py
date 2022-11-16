from rest_framework import serializers
from rest_framework.renderers import JSONRenderer

from .models import Transactions, CheckData, Categories, TypeOfTranscation


# class TransactionsModel:
#     def __init__(self, item_transaction_date, item_name, item_price, item_category, item_user, item_type):
#         self.item_transaction_date = item_transaction_date
#         self.item_name = item_name
#         self.item_price = item_price
#         self.item_category = item_category
#         self.item_user = item_user
#         self.item_type = item_type
class TypeOfTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeOfTranscation
        fields = ('type_name', 'id')

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ('category_name', 'id')

class CheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckData
        fields = ('check_name', 'check_count', 'check_price', 'check_category', 'date', 'check_user')


class TransactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = ('date', 'item_name', 'item_price', 'item_category', 'item_user', 'item_type')
        date = serializers.DateField(format='%d.%m.%Y')
    # item_transaction_date = serializers.DateField()
    # item_name = serializers.CharField()
    # item_price = serializers.
    # item_category = serializers.
    # item_user = serializers.
    # item_type = serializers.

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
#     model = TransactionsModel('item_transaction_date: 2020-10-10', 'item_name: adadaaddaw', 'item_price: 1', 'item_category: 1', 'item_type: 1', 'item_user: 1')
#     model_sr = TransactionsSerializer(model)
#     print(model_sr.data)
#     json = JSONRenderer().render(model_sr.data)
#     print(json)
