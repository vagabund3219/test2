# Generated by Django 4.1.3 on 2022-12-03 07:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kursach', '0003_remove_news_date_remove_news_text_news_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='news',
            name='image',
            field=models.ImageField(upload_to='uploads/% Y/% m/% d/'),
        ),
    ]
