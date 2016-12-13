unhash.py has a function that returns the unhashed string 


shopping is a node.js app to crawl shopping.com and extract the required informations

    1. total number of results for a given keyword : 
          endpoint: /total
          queryparams: keyword
          eg: /total?keyword=mobile
          
    2. All items for a given keyword and a given page
           endpoint: /products
           queryparams: keyword, page
           eg: /products?keyword=mobile&page=4
           
  this app listens on port: 8081
  
  to run: 
  
     node index.js
     
     in browser hit any endpoint with the given queryparameters
