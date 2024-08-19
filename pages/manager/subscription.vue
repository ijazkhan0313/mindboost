<template>
  <div>
    <div class="row justify-content-center mt-5 ">

      <!-- form -->
      <div class="col-12 my-4 col-sm-8">
        <!-- form -->
        <div class="row g-3">
          <div class="col-md-9">
            <label for="inputPassword2" class="visually-hidden">Email address</label>
            <input type="text" class="form-control" v-model="email" name="email" placeholder="Enter email"
              aria-describedby="emailHelp">
          </div>
          <div class="col-md-2">
            <button @click="inviteUser" class="btn btn-primary">Invite User</button>
          </div>
        </div>

      </div>

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
            <tr v-for="(subscription, index) in subscriptions" :key="subscription.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ subscription.product_name }}</td>
              <td>{{ subscription.product_billing_frequency }} {{ subscription.product_billing_interval }}</td>


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
            </tr>
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
async function fetchSubscriptions() {
  try {
    const response = await axios.post('http://localhost:8000/api/user-active-subscriptions', {
      email: userStore.user.email,
    });
    subscriptions.value = response.data.data;
    console.log('Fetched subscriptions:', response);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
  }
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// function getStatusLabel(expiryDate) {
//   const today = new Date();
//   const expiry = new Date(expiryDate);
//   if (expiry < today) return 'Expired';
//   return 'Active';
// }

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
    const response = await axios.post('http://localhost:8000/api/invitations/send', {
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

// ============================= CancelSubscription ===========================
async function CancelSubscription(id) {
  // alert(id)
  try {
    const response = await axios.post(`http://localhost:8000/api/cancel-subscriptions`, {
      email: userStore.user.email,
      subscription_id: id
    });
    subscriptions.value = response.data.data;
    // sweet alert message
    Swal.fire({
      title: "Subscription Cancel!",
      text: "Your Subscriptionis is Canceled.",
      icon: "success"
    });
    // console.log('cancel subscriptions:', response.data.data);
  } catch (error) {
    console.error('Error to cancel subscriptions:', error);
  }


  // Swal.fire({
  //   title: "Good job!",
  //   text: "Your subscription is cancelled!",
  //   icon: "success"
  // });
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