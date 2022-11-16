from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import CheckData, Transactions, Categories, TypeOfTranscation
from ..serializer import TransactionsSerializer, CheckSerializer, CategoriesSerializer, TypeOfTransactionSerializer


class TypeOfTransactionApiList(generics.ListAPIView):
    queryset = TypeOfTranscation.objects.all()
    serializer_class = TypeOfTransactionSerializer


class CategoriesApiList(generics.ListCreateAPIView):
    # queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer
    def get_queryset(self):
        user = self.request.user
        return Categories.objects.filter(category_user_id=user)

class TransactionsApiList(generics.ListCreateAPIView):
    queryset = Transactions.objects.all()
    serializer_class = TransactionsSerializer
    def get_queryset(self):
        user = self.request.user
        return Transactions.objects.filter(item_user_id=user)
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['item_category_id',]

class CheckApiList(generics.ListCreateAPIView):
    queryset = CheckData.objects.all()
    serializer_class = CheckSerializer
    def get_queryset(self):
        user = self.request.user
        return CheckData.objects.filter(check_user_id=user)
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['check_category_id',]

class TransactionsAPIView(APIView):
    def get(self, request):
        lst = Transactions.objects.all()
        return Response({'trans': TransactionsSerializer(lst, many=True).data})

    def post(self, request):
        serializer = TransactionsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'title': serializer.data})

    def put(self, request, *args, **kwargs):
        pk=kwargs.get('pk', None)
        if not pk:
            return Response({'error':'pk....'})

        try:
            instance = Transactions.objects.get(pk=pk)

        except:
            return Response({'error':'pk....'})

        serializer = TransactionsSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'post': serializer.data})

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if not pk:
            return Response({'error':'there is no such pk'})

        try:
            instance = Transactions.objects.get(pk=pk)
        except:
            return  Response({'error':'there is no such pk'})

        instance.delete()
        return Response({'post': 'delete post' + str(pk)})
