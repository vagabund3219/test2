# Generated by Django 4.1.3 on 2022-11-14 20:51

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kursach', '0009_alter_bill_options_alter_categories_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='check_data',
            name='date',
            field=models.DateField(default=datetime.date(2022, 11, 14)),
        ),
    ]