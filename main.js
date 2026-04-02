var app = new Vue({
    el: "#app",
    data:{
        products:[
            {id:1, title:"Clementines", short_text:"Sweet citrus", image:'clementine.jpg',
            desc:{
                plant:{p1:"Strong mandarin variety.", p2:"High productivity.", p3:"Early matured."},
                fruit:{f1:"Easy to peel.", f2:"Deep orange color.", f3:"Average size: 5-7 cm."},
                cycle:{c1:"Autumn", c2:"Winter"},
                color:"Orange"
            }},
            {id:2, title:"Minneola", short_text:"Juicy Tangelo", image:'minneola.jpg',
            desc:{
                plant:{p1:"Vigorous growth.", p2:"Good leaf coverage.", p3:"Mid-season."},
                fruit:{f1:"Rich flavor.", f2:"Very juicy.", f3:"Unique shape."},
                cycle:{c1:"Winter", c2:"Spring"},
                color:"Deep Orange"
            }},
            {id:3, title:"Murcott", short_text:"Honey flavor", image:'murcott.jpg',
            desc:{
                plant:{p1:"High yield.", p2:"Strong branches.", p3:"Late season."},
                fruit:{f1:"Very sweet.", f2:"Thin skin.", f3:"Great for juice."},
                cycle:{c1:"Spring"},
                color:"Yellow-Orange"
            }}
        ],
        product:[],
        cart:[],
        contactFields:[{
            name: "",
            companyName: "",
            position: "",
            city: "",
            country: "",
            telephone: "",
            email: "",
            youAre: "",
            otherSpecify: "",
            interested: "",
            capcha: ""
        }],
        btnVisible: 0,
        cartVisible:0,
        formSubmitted: false,
        formVisible: 1
    },
    mounted:function(){
        this.getProduct();
        this.checkInCart();
        this.getCart();
    },
    methods:{
        getProduct:function(){
            if(window.location.hash){
                var id = window.location.hash.replace('#','');
                if(this.products && this.products.length>0){
                    for(i in this.products){
                        if(this.products[i] && this.products[i].id && id==this.products[i].id) this.product=this.products[i];
                    }
                }
            }
        },
        addToCart:function(id){
            if(window.localStorage.getItem('cart')){
                this.cart=window.localStorage.getItem('cart').split(',');
            }

            if(this.cart.indexOf(String(id))==-1){
                this.cart.push(id);
                window.localStorage.setItem('cart',this.cart.join());
                this.btnVisible=1;
            }
        },
        checkInCart:function(){
            if(this.product && this.product.id && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id))!=-1) this.btnVisible=1;
            if (window.localStorage.getItem('cart') !== null) this.cartVisible = 1;
        },
        getCart:function(){
            if(window.localStorage.getItem('cart')){
                this.cart=window.localStorage.getItem('cart').split(',');
                this.product = [];
                for(var value of this.cart){
                    for(var index in this.products){
                        if(value == this.products[index].id ){
                            this.product.push(this.products[index])
                        }
                    }
                }
            }
        },
        removeFromCart:function(id){
            for(var index in this.product){
                if(id ==  this.product[index].id){
                    this.product.splice(index,1);
                    this.cart.splice(index,1)
                }
            }
            window.localStorage.setItem('cart', this.cart.join(','));
            this.getCart();
            location.reload();
        },
        makeOrder:function(){
            
            this.formVisible=0;
            this.cartVisible=0;
            
            this.cart = [];
            window.localStorage.removeItem('cart');
            alert("Ваш запит надіслано. Натисніть OK, щоб оновити сторінку.");
        }
    },
});