import json
from django.http import JsonResponse, HttpRequest, HttpResponseForbidden
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from . import models as up_models


def login_view(request):
    params = json.loads(request.body.decode('utf8'))
    username = params.get('username')
    password = params.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({'auth': True, **user.userprofile.to_dict()})
    else:
        return JsonResponse({'auth': False})


def logout_view(request):
    logout(request)
    return JsonResponse({'auth': False})


@login_required
def user_info(request: HttpRequest, username):
    if request.user.username != username:
        return HttpResponseForbidden()


    return JsonResponse({
        'status': 'ok',
        'payload': {
            'profile': request.user.to_dict()
        }
    })
