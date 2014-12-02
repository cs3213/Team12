from models import Program, User
#from forms import ProgramForm
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import render_to_response
from django.core.urlresolvers import reverse
from django.http import HttpResponse
import json
from django.template.context import RequestContext
#import codecs

def home(request):
    try:
        #add user to db
        owner=request.user.email
        user = User(
            google_id = owner
            )
        user.save()
        programs = Program.objects.filter(owner=user)
        if Program.objects.all():
            lastModifiedId = Program.objects.all()[0].id
        else:
            lastModifiedId = -1
        context = RequestContext(request,
                           {'request':request, 'user': request.user, 'programs': programs, 'lastModifiedId':lastModifiedId})
        return render_to_response('coincide/index.html',
                             context_instance=context)
    except Exception, e:
        context = RequestContext(request,
                           {'request':request, 'user': request.user, 'programs': None})
        return render_to_response('coincide/index.html',
                             context_instance=context)

def add_program(request):
    #title = request.POST["title"]
    #description = request.POST["description"]
    user = request.POST["owner"]
    print user
    owner = User.objects.get(google_id=user)
    content = request.POST["content"]
    content = content.encode('utf-8')
    print owner
    print "before printing out content in add_program"
    print content
    program = Program(
            #title = title,
            #description = description,
            owner = owner,
            content = content
            )
    program.save()
    data = {'content':program.content, 'owner':program.owner.google_id, 'id':program.id}
    response_data = {'data':data}
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def update_program(request):
    id = request.POST["id"]
    program = Program.objects.get(id=id)
    #program.title = request.POST["title"]
    #program.description = request.POST["description"]
    content = request.POST["content"]
    content = content.encode('utf-8')
    program.content = content
    print "before printing out prgram content in update_program"
    print program.content
    program.save()
    programs = Program.objects.filter(owner=program.owner)
    data = {'content':program.content, "updatedId": program.id}
    response_data = {'data':data}
    print program.id
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def delete_program(request):
    id = request.POST["id"]
    program = Program.objects.get(id=id)
    owner = program.owner
    program.delete()
    programs = Program.objects.filter(owner=owner)
    data = {"deletedid":id}
    response_data = {"data":data}
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def view_program(request):
    id = request.POST["id"]
    print id
    if id == -1:
        data ={"content":None, "id":id}
        response_data = {'data': data}
        return HttpResponse(json.dumps(response_data), content_type="application/json")
    else:
        program = Program.objects.get(id=id)
        #content = program.content.decode('utf-8', 'ignore')
        #content = unicode(program.content,'utf-8')
        #content = program.content.decode('ascii') #since python is in ASCII
        print "before content in view program"
        print program.content.encode('utf-8')
        print "haha"
        data = {'content':program.content.encode('utf-8'), "id":id}
        response_data = {'data': data}
        print program.owner
        return HttpResponse(json.dumps(response_data), content_type="application/json")

def load_last_modified(request):
    id = request.POST["google_id"]
    user = User.objects.get(google_id=id)
    program = Program.objects.all()[0]
    response_data = {'user': user, 'program': program}
    return HttpResponse(response_data, content_type="application/json") 

def all(request):
    id = request.POST["google_id"]
    user = User.objects.get(google_id=id)
    programs = Program.objects.filter(owner=user)
    response_data = {'user': user, 'programs': programs}
    return HttpResponse(response_data, content_type="application/json")

def add_user(request):
    google_id = request.POST["google_id"]
    user = User(
            google_id = google_id
            )
    user.save()
    response_data = {'user': user}
    return HttpResponse(response_data, content_type="application/json")







