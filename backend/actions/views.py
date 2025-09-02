#from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ActionSerializer
from .storage import read_data, write_data

class ActionList(APIView):
    def get(self, request):
        data = read_data()
        return Response(data)

    def post(self, request): #check 
        data = read_data()
        new_id = max([item['id'] for item in data], default=0) + 1
        serializer = ActionSerializer(data=request.data)
        if serializer.is_valid():
            action = serializer.validated_data

            # Convert date to string before saving
            if 'date' in action:
                action['date'] = str(action['date'])

            action['id'] = new_id
            data.append(action)
            write_data(data)
            return Response(action, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ActionDetail(APIView):
    def get_object(self, pk):
        data = read_data()
        for item in data:
            if item['id'] == pk:
                return item
        return None

    def put(self, request, pk):
        data = read_data()
        item = self.get_object(pk)

        serializer = ActionSerializer(data=request.data)
        if serializer.is_valid():
            updated = serializer.validated_data
            updated['id'] = pk

            if 'date' in updated:
                updated['date'] = str(updated['date'])

            if item:
                for i, obj in enumerate(data):
                    if obj['id'] == pk:
                        data[i] = updated
                        break
            else:
                data.append(updated)

            write_data(data)
            return Response(updated, status=status.HTTP_200_OK if item else status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    def patch(self, request, pk):
        data = read_data()
        item = self.get_object(pk)
        if not item:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ActionSerializer(instance=item, data=request.data, partial=True)
        if serializer.is_valid():
            updated_fields = serializer.validated_data

            if 'date' in updated_fields:
                updated_fields['date'] = str(updated_fields['date'])

            for key, value in updated_fields.items():
                item[key] = value

            for i, obj in enumerate(data):
                if obj['id'] == pk:
                    data[i] = item
                    break

            write_data(data)
            return Response(item)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        data = read_data()
        data = [item for item in data if item['id'] != pk]
        write_data(data)
        return Response(status=status.HTTP_204_NO_CONTENT)