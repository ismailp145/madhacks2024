import backendFramework.example.Scraper as Scraper
import backendFramework.example.Slave as Slave
import numpy as np
import matplotlib.pyplot as plt
import time

    
def scatter_plot(X, y, blockProgram = False):
    plt.figure()
    plt.scatter(X, y)

    # if labels is not None:
    #     for i, label in enumerate(labels):
    #         plt.annotate(label, (X[i], y[i]))
    
    plt.show(block=blockProgram)
    plt.close()
    
def plot_graph(X, y, blockProgram = False):
    plt.plot(X, y)
    plt.show(block = blockProgram)
    plt.close()

if __name__ == '__main__':
    print("Starting")
    subject = "Wikipedia"
    result = "Paris"

    #Scraping the data
    start = time.time()
    uarr = Scraper.startScraping(subject, result)
    end = time.time()
    print("Time taken to scrape",subject,": ", round(end-start, 3),"seconds")

    start = time.time()
    #Extracting number of links from each page
    output = Slave.main(uarr)
    end = time.time()
    print("Time taken: ", round(end-start, 3),"seconds")

    #Plot data
    # scatter_plot(range(0, len(wY)), wY)
    # scatter_plot(range(0,len(uarr)), output)
    # scatter_plot(output, wY, True)
