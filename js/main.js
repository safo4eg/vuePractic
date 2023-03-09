let template1 = 'templates/product.html';
let template2 = 'templates/product-details.html';
let template3 = 'templates/product-review.html';
let template4 = 'templates/product-tabs.html';
let templates = getTemplates(template1, template2, template3, template4);

templates.then(array => {
    let productTemplate = array[0];
    let productDetailsTemplate = array[1];
    let productReviewTemplate = array[2];
    let productTabsTemplate = array[3];

    let eventBus = new Vue();

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
                reviews: [],
            }
        },

        methods: {
            addToCart() {
                this.$emit(
                    'add-to-cart',
                     this.variants[this.selectedVariant].variantId
                );
            },

            removeToCart() {
                this.$emit('remove-to-cart');
            },

            updateProduct(index) {
                this.selectedVariant = index;
            },
        },

        mounted() {
            eventBus.$on('review-submitted', productReview => {
                this.reviews.push(productReview);
            });
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
        props: {
            details: {
                type: Array,
                required: true
            }
        },

        data() {
            return {

            }
        }
    }

    let productReviewBody = {
        template: productReviewTemplate,
        data() {
            return {
                name: null,
                review: null,
                rating: null,
                isRec: 'yes',
                errors: []
            }
        },

        methods: {
            onSubmit() {
                if(this.name && this.review && this.rating) {
                    let productReview = {
                        name: this.name,
                        review: this.review,
                        rating: this.rating,
                        isRec: this.isRec === 'yes'? 'Поделился': 'Не поделился',
                    }
                    eventBus.$emit('review-submitted', productReview)
                    this.name = null
                    this.review = null
                    this.rating = null
                    this.isRec = 'yes'
                } else {
                    if(!this.name) this.errors.push("Name required.")
                    if(!this.review) this.errors.push("Review required.")
                    if(!this.rating) this.errors.push("Rating required.")
                }
            }
        }
    }

    let productTabsBody = {
        template: productTabsTemplate,

        props: {
            reviews: {
                type: Array,
                required: false
            }
        },

        data() {
            return {
                tabs: ['Reviews', 'Make a Review'],
                selectedTab: 'Reviews '
            }
        },

    }

    Vue.component('product', productBody);
    Vue.component('product-details', productDetailsBody);
    Vue.component('product-review', productReviewBody);
    Vue.component('product-tabs', productTabsBody);

    let app = new Vue({
        el: '#app',
        data: {
            premium: false,
            cart: []
        },

        methods: {
            updateCart(id) {
                this.cart.push(id);
            },

            popFromCart() {
                this.cart.pop();
            }
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





