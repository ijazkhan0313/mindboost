<template>
  <div>
    <div class="row justify-content-center mt-5 ">
      <div class="col-12 col-sm-8">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Full Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              <th scope="col">Language</th>
              <th scope="col">Acttion</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(acceptedInvitation, index) in acceptedInvitations" :key="acceptedInvitation.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ acceptedInvitation.first_name }}</td>
              <td>{{ acceptedInvitation.surname }} </td>
              <td>{{ acceptedInvitation.email }}</td>
              <td>
                <span :class="badgeClass(acceptedInvitation.invitation_status)">
                  {{ badgeText(acceptedInvitation.invitation_status) }}
                </span>
              </td>
              <td>{{ acceptedInvitation.language }}</td>
              <td>
                <button class="btn btn-danger">Cancel Invitation</button>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
// ================ import ================
import { ref } from 'vue';
import axios from 'axios';
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()

// ================ start scripts ================
const acceptedInvitations = ref([]);
async function fetchSubscriptions() {
  try {
    const response = await axios.post('https://mindbostapi.dowhf.com/api/accepted-invitations', {
      inviter_id: userStore.user.id,
    });
    acceptedInvitations.value = response.data.data;
    // console.log('Fetched pending Invitations:', response.data.data);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
  }
}

// 
function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
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