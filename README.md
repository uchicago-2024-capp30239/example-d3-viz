# WIP Data Viz

This visualization is a work in progress. I'm still exploring ideas & missing a piece of data I wanted to complete my actual idea.

I wanted to share it in this form so that you could envision how a complete application fits together when comprised of JS, CSS, and HTML.

To see it, enter the directory `www` and run the command `python -m http.server`, then open <http://localhost:8000> in your browser.

I've documented the steps I took while building. These roughly correspond to commits if you'd like to view the individual commits to see what changed.

## 0) Data Cleaning

I went to <https://www.federalreserve.gov/releases/z1/dataviz/dfa/distribute/table/#quarter:34;series:Net%20worth;demographic:networth;population:1,3,5,7,9;units:levels>

and downloaded the CSV file to `cleaning/`. 

I then ran `uv run python clean.py` to generate `levels.csv` which is in `www/`

## Step 1) HTML Template

I went to this page <https://bulma.io/documentation/start/overview/> and took the HTML template that they used.

This template links to the Bulma CSS file on a CDN, Content Delivery Network. This is a service that hosts commonly used CSS and JS libraries.

For final deployment, we will probably want to stop using this in favor of our own copy of Bulma/D3/etc. but that can wait.

I sketched out a general idea of some of the content I wanted to have on the page with some text and empty div tags.

## Step 2) First Viz - Pyramids

I worked on the pyramids first, a particular side-by-side view of these was my initial inspiration, but with the data I have so far, I wanted to just get something working and animating.

This led to me adding the play button & slider to the HTML as well. But most of the work is in `pyramid.js` and `main.js`.

## Step 3) Second Viz - Lines

While there's more I want to do with the pyramids, it'll mostly be passing different data, the chart itself works as intended.

Using the same data, I also want to show a line chart, or I might. This work is in `linechart.js` and took some small updates to `main.js` to also call this new function similarly to `drawPyramid`.

It may be the case these don't animate, but I wrote them this way just in case they need to, if they don't animate at all-- I'll move the call from the update function to a function that is only called once on initial display in the final product.

## What's Next

- add a map or two as a demonstration, probably states by income inequality
- add more data either pre-1989 or international comparisons
- "finale" show data adjusted by population, to show how fed numbers underplay number of people
