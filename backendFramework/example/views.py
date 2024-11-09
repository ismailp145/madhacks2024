# views.py
import time
from django.shortcuts import render
from django.http import JsonResponse
from .models import Scraper
from .Scraper import startScraping  

def scrape_view(request):
    subject = request.GET.get('subject')
    result = request.GET.get('result')
    fast_scrape = request.GET.get('fastScrape', 'false').lower() == 'true'

    start_time = time.time()
    scraped_data = startScraping(subject, result, fast_scrape)
    time_taken = time.time() - start_time

    scraper = Scraper.objects.create(subject=subject, result=result, time_taken=time_taken)
    scraper.save()

    return JsonResponse({'subject': subject, 'result': result, 'time_taken': time_taken, 'data': scraped_data})