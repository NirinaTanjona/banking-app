# Generated by Django 4.1.3 on 2023-04-15 10:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_transaction_options_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='transaction',
            options={'ordering': ['created'], 'verbose_name': 'Transaction', 'verbose_name_plural': 'Transactions'},
        ),
        migrations.AlterModelOptions(
            name='user',
            options={'verbose_name': 'User', 'verbose_name_plural': 'Users'},
        ),
        migrations.AddField(
            model_name='transaction',
            name='receiver_name',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='transaction',
            name='sender_name',
            field=models.CharField(default='', max_length=200),
        ),
    ]