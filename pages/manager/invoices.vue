<template>
    <div>
        <div class="row justify-content-center mt-5 ">

            <h4>Invoices</h4>

            <!-- tbale -->
            <div class="col-12 col-sm-8">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Subscription Name</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Payment Method</th>
                            <th scope="col">Payment Type</th>
                            <th scope="col">Subscription Qty</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                            <th scope="col">Purchase Date</th>
                            <th scope="col">Expiry Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- <tr v-for="(subscription, index) in subscriptions" :key="subscription.id">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ subscription.product_name }}</td>
                            <td>{{ subscription.product_billing_frequency }} {{ subscription.product_billing_interval }}
                            </td>


                            <template v-if="subscription.payment_method === 'card'">
                                <i class="fas fa-credit-card"></i> Card
                            </template>
<template v-else-if="subscription.payment_method === 'bank'">
                                <i class="fas fa-university"></i> Bank
                            </template>
<template v-else>
                                {{ subscription.payment_method }}
                            </template>

<td>{{ subscription.payment_type }}</td>
<td>{{ subscription.product_quantity }}</td>
<td>${{ subscription.product_price }}</td>
<td>
    <span :class="getStatusClass(subscription.status)">
        {{ getStatusLabel(subscription.status) }}
    </span>
</td>
<td>{{ formatDate(subscription.purchasing_date) }}</td>
<td>{{ formatDate(subscription.expiry_date) }}</td>
<td>
    <button class="btn btn-danger" @click="CancelSubscription(subscription.id)">Cancel</button>
</td>
</tr> -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()

const subscriptions = ref([]);
// async function fetchSubscriptions() {
//     try {
//         const response = await axios.get('https://sandbox-api.paddle.com/transactions/txn_01j5gm0d7sygqf1akx0gyj9a4v');

//         console.log('Fetched subscriptions + invouces:', response);
//     } catch (error) {
//         console.error('Error fetching subscriptions:', error);
//     }
// }

async function fetchSubscriptions() {
    try {
        const response = await axios.get('https://sandbox-api.paddle.com/transactions/txn_01j5gm0d7sygqf1akx0gyj9a4v/invoice', {
            headers: {
                'Authorization': 'Bearer ed3ac089a5315d843e440563a2c4688999dd3d145211430730'
            }
        });

        console.log('Fetched subscriptions + invoices:', 'response.data you doine');
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function getStatusLabel(status) {
    if (status === 1) {
        return 'Active';
    } else {
        return 'Cancelled';
    }
}

function getStatusClass(status) {
    return status == '0' ? 'badge bg-warning' : 'badge bg-success';
}

// Fetch subscriptions when the component is mounted
fetchSubscriptions();

// ====================================== invite users ======================================
// Define a reactive variable for email
const email = ref('');

// Function to send invitation
async function inviteUser() {
    if (!email.value) {
        console.error('Email is required');
        return;
    }

    try {
        const response = await axios.post('https://mindbostapi.dowhf.com/api/invitations/send', {
            email: email.value,
            inviter_id: userStore.user.id
        });
        console.log('Invitation sent:', response.data);
        // sweet alert message
        Swal.fire({
            title: "Good job!",
            text: "Inviateion email is sent successfully",
            icon: "success"
        });

        // You can update subscriptions or handle response here
    } catch (error) {
        console.error('Error sending invitation:', error);
    }
}



</script>


<style>
.active-sub {
    background: #E9C046;
    box-shadow: 0px 0px 16px 1px rgba(108, 97, 97, 0.05);
    border-radius: 12px;
    color: white;
    background-color: #E9C046 !important;
}

.sub-card {
    background: #FFFFFF;
    box-shadow: 0px 0px 16px 1px rgba(108, 97, 97, 0.05);
    border-radius: 12px;
    color: black;
}
</style>