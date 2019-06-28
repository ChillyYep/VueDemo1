module.exports = {
    devServer: {
        // proxy:'http://localhost:8880'
            proxy:{
                '/user/*':{
                    target:'http://localhost:8880',
                    secure:false,
                    changeOrigin:true
                },
                '/search/*':{
                    target:'http://localhost:8880',
                    secure:false,
                    changeOrigin:true
                },
                '/management/*':{
                    target:'http://localhost:8880',
                    secure:false,
                    changeOrigin:true
                },
                '/*':{
                    target:'http://localhost:8880',
                    secure:false,
                    changeOrigin:true
                },
            } 
    }
  }