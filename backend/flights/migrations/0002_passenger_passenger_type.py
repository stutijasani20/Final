# Generated by Django 5.0.4 on 2024-05-12 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flights', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='passenger',
            name='passenger_type',
            field=models.CharField(choices=[('adult', 'Adult'), ('child', 'Child'), ('infant', 'Infant')], default='adult', max_length=10),
        ),
    ]
