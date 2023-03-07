let template1 = 'templates/product.html';
let template2 = 'templates/product-details.html';

let templates = getTemplates(template1, template2);
templates.then(array => {
    let productTemplate = array[0];
    let productDetailsTemplate = array[1];

    let productBody = {
        template: productTemplate,

        props: {
            premium: {
                type: Boolean,
                required: true
            }
        },

        data() {
            return {
                product: "Socks",
                brand: 'Vue Mastery',
                selectedVariant: 0,
                altText: "A pair of socks",
                details: ['80% cotton', '20% polyester', 'Gender-neutral'],
                variants: [
                    {
                        variantId: 2234,
                        variantColor: 'green',
                        variantImage: "./assets/vmSocks-green-onWhite.jpg",
                        variantQuantity: 10,
                        variantOnSale: true,
                    },
                    {
                        variantId: 2235,
                        variantColor: 'blue',
                        variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                        variantQuantity: 0,
                        variantOnSale: false,
                    }
                ],
                cart: 0,
            }
        },

        methods: {
            addToCart() {
                this.cart += 1;
            },
            removeToCart() {
                if(this.cart > 0) this.cart--;
            },
            updateProduct(index) {
                this.selectedVariant = index;
            }
        },

        computed: {
            title() {
                return this.brand + ' ' + this.product;
            },

            image() {
                return this.variants[this.selectedVariant].variantImage;
            },

            inStock() {
                return this.variants[this.selectedVariant].variantQuantity;
            },

            onSale() {
                return this.variants[this.selectedVariant].variantOnSale;
            },

            shipping() {
                if(this.premium) {
                    return 'Free';
                } else {
                    return '2.99';
                }
            }
        }
    }

    let productDetailsBody = {
        template: productDetailsTemplate,
        data() {
            return {

            }
        }
    }

    Vue.component('product', productBody);
    Vue.component('product-details', productDetailsBody);
    let app = new Vue({
        el: '#app',
        data: {
            premium: false
        }
    });
});


async function getTemplates(...pathTemplates) {
    let promises = [];

    for(let template of pathTemplates) {
        let promise = new Promise((resolve, reject) => {
            fetch(template).then(
                response => {
                    if(response.ok) resolve(response.text());
                    else reject('Ошибка');
                });
        });

        promises.push(promise);
    }

    let result = await Promise.all(promises);
    return result;
}





