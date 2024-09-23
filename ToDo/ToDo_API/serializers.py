from .models import TodoModel
from rest_framework import serializers

class ToDoSerializer(serializers.ModelSerializer):  
    class Meta:
        model = TodoModel  
        fields = '__all__'  

    def create(self, validated_data):
        # The default create method works for ModelSerializer, but you can keep this if you want custom logic
        return TodoModel.objects.create(**validated_data)
