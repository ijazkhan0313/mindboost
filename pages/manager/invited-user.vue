<template>
  <div class="row justify-content-center mt-5">
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



    <!-- table -->
    <div class="col-12 col-sm-8">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Invitation Date</th>
            <th scope="col">Invitation Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pendingInvitation, index) in pendingInvitations" :key="pendingInvitation.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ pendingInvitation.email }}</td>
            <td>
              <span :class="badgeClass(pendingInvitation.status)">
                {{ badgeText(pendingInvitation.status) }}
              </span>
            </td>
            <td>{{ formatDate(pendingInvitation.created_at) }}</td>
            <td>
              <button class="btn btn-danger">Cancel Invitation</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


  </div>
</template>





<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()



const data = useUserStore();
console.log('user details', data.user.id);

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
      inviter_id: data.user.id
    });
    console.log('Invitation sent:', response.data);
    // sweet alert message
    Swal.fire({
      title: "Good job!",
      text: "Inviateion email is sent successfully",
      icon: "success"
    });
    // reload the window after 2 seconds
    setTimeout(() => location.reload(), 2000);

    // You can update subscriptions or handle response here
  } catch (error) {
    console.error('Error sending invitation:', error);
  }
}

// ================ get inviated users from backend ================
const pendingInvitations = ref([]);
async function fetchSubscriptions() {
  try {
    const response = await axios.post('http://localhost:8000/api/invited-users', {
      inviter_id: userStore.user.id,
    });
    pendingInvitations.value = response.data.data;
    console.log('Fetched pending Invitations:', response.data.data);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
  }
}


function getStatusLabel(expiryDate) {
  const today = new Date();
  const expiry = new Date(expiryDate);
  if (expiry < today) return 'Expired';
  return 'Active';
}

function getStatusClass(expiryDate) {
  return getStatusLabel(expiryDate) === 'Expired' ? 'badge bg-warning' : 'badge bg-success';
}

// Fetch subscriptions when the component is mounted
fetchSubscriptions();

// ================================ table ================================
// Define functions
function badgeClass(status) {
  return {
    'badge': true,
    'bg-warning': status === 0, // Pending
    'bg-success': status === 1  // Active
  };
}
// status budget
function badgeText(status) {
  return status === 0 ? 'Pending' : 'Active';
}

// date format 
function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
</script>



<style></style>