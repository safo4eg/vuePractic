// let template =
//     '<div class="product">' +
//         '<div class="product-image">' +
//             '<img :src="image" :alt="altText">' +
//         '</div>' +
//         '<div class="product-info">' +
//             '<h1>{{title}}</h1>' +
//             '<div class="sale-wrapper">' +
//                 '<p class="onSale" v-if="onSale">Sale</p>' +
//             '</div>' +
//             '<p v-if="inStock">In stock</p>' +
//             '<p v-else :class="{isNotStock: !inStock}">Out of Stock</p>' +
//             '<ul>' +
//             '<li v-for="detail in details">{{detail}}</li>' +
//             '</ul>' +
//             '<div class="color-box"' +
//             'v-for="(variant, index) in variants"' +
//             ':key="variant.variantId"' +
//             ':style="{backgroundColor:variant.variantColor}"' +
//             '@mouseover="updateProduct(index)"' +
//             '>' +
//             '</div>' +
//             '<div class="button-wrapper">' +
//                 '<button' +
//                 '@click="addToCart"' +
//                 ':disabled="!inStock"' +
//                 ':class="{disabledButton: !inStock}"' +
//                 '>' +
//                 'Add to cart' +
//                 '</button>' +
//                 '<button id="removeToCart" @click="removeToCart">' +
//                 'Remove from cart' +
//                 '</button>' +
//             '</div>' +
//             '<div class="cart">' +
//                 '<p>Товаров в корзине({{cart}})</p>' +
//             '</div>' +
//         '</div>' +
//     '</div>'; // produc

let template1 = getTemplate('templates/template1.html');
template1.then(content => {
    let body = {
        template: content,
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
            }
        }
    }


    Vue.component('product', body);
    let app = new Vue({
        el: '#app',
    });
});

async function getTemplate(path) {
    let promise = new Promise((resolve, reject) => {
        fetch(path).then(
            response => {
               if(response.ok) resolve(response.text());
               else reject('Ошибка');
            });
    });

    let result = await promise;
    return result;
}





