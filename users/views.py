from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, reverse
from .forms import User_register_form
from django.contrib import messages
from django.contrib.auth.views import LoginView
from kursach.models import Bill

def register(request):
    if request.method == 'POST':
        form = User_register_form(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Успешная регистрация')
            return redirect('login')
        else:
            messages.error(request, 'Ошибка регистрации')
    else:
        form = User_register_form()
    return render(request, 'users/register.html', {'form': form})

