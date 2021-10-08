from .models import Task
from rest_framework import serializers

class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        # extra_kwargs = {
        #     'url': {'view_name': 'Task', 'lookup_field': 'id'}
        # }