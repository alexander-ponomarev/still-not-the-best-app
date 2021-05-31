The app is still pretty basic and there is a room for improvement

1) Shows component must be reused (I copied it for now) and moved to shared module
2) App routing module might be added, I haven't done it because of only two routes. Not worth it at the moment
3) The request for cast should be replaced with another endpoint (there is one that can return cast). 
   Instead of firing N request for every show
4) Shows data might be hidden behind the pipe to avoid repetitive template 
   binding of unchanged values