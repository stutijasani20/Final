# Generated by Django 5.0.4 on 2024-05-13 05:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('flights', '0004_alter_passenger_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='total_price',
        ),
    ]
