<template>
    <div class="row justify-content-center mt-5">
      
      <!-- table -->
      <div class="col-12 col-sm-8">
        <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Product Name</th>
      <th scope="col">Product ID</th>
      <th scope="col">Product Image</th>
      <th scope="col">Product Trial Period</th>
      <th scope="col">Product Quantity</th>
      <th scope="col">Product Price</th>
      <th scope="col">Product Status</th>
      <th scope="col">Purchasing Date</th>
      <th scope="col">Expiry Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      
      <td>Smartphone</td>
      <td>pro_01j50****7tqv1thd</td>
      <td><img src="https://picsum.photos/20/20" alt="Smartphone" width="50" height="50"></td>
      <td><span class="badge bg-success">30 Days</span></td>
      <td>2</td>
      <td>$299.99</td>
      <td><span class="badge bg-success">Active</span></td>
      <td>2024-07-01</td>
      <td>2024-08-01</td>
    </tr>
    <tr>
      
      <td>Laptop</td>
      <td>pro_01j50****7tqv1thd</td>
      <td><img src="https://picsum.photos/20/20" alt="Laptop" width="50" height="50"></td>
      <td><span class="badge bg-secondary">14 Days</span></td>
      <td>1</td>
      <td>$999.99</td>
      <td><span class="badge bg-secondary">Expired</span></td>
      <td>2024-07-15</td>
      <td>2024-08-15</td>
    </tr>
    <tr>
      
      <td>Headphones</td>
      <td>pro_01j50****7tqv1thd</td>
      <td><img src="https://picsum.photos/20/20" alt="Headphones" width="50" height="50"></td>
      <td><span class="badge bg-success">30 Days</span></td>
      <td>3</td>
      <td>$129.99</td>
      <td><span class="badge bg-success">Active</span></td>
      <td>2024-08-01</td>
      <td>2024-08-08</td>
    </tr>
    <tr>
      
      <td>Smartwatch</td>
      <td>pro_01j50****7tqv1thd</td>
      <td><img src="https://picsum.photos/20/20" alt="Smartwatch" width="50" height="50"></td>
      <td><span class="badge bg-success text-light">14 Days</span></td>
      <td>1</td>
      <td>$199.99</td>
      <td><span class="badge bg-success">Active</span></td>
      <td>2024-08-05</td>
      <td>2024-09-05</td>
    </tr>
    <tr>
      
      <td>Tablet</td>
      <td>pro_01j50****7tqv1thd</td>
      <td><img src="https://picsum.photos/20/20" alt="Tablet" width="50" height="50"></td>
      <td><span class="badge bg-secondary">14 Days</span></td>
      <td>2</td>
      <td>$349.99</td>
      <td><span class="badge bg-secondary">Expired</span></td>
      <td>2024-07-25</td>
      <td>2024-09-25</td>
    </tr>
    <tr>
      
      <td>Camera</td>
      <td>pro_01j50****7tqv1thd</td>
      <td><img src="https://picsum.photos/20/20" alt="Camera" width="50" height="50"></td>
      <td><span class="badge bg-secondary">14 Days</span></td>
      <td>1</td>
      <td>$499.99</td>
      <td><span class="badge bg-secondary">Expired</span></td>
      <td>2024-08-10</td>
      <td>2024-08-24</td>
    </tr>
    <tr>
      
      <td>Printer</td>
      <td>pro_01j50****7tqv1thd</td>
      <td><img src="https://picsum.photos/20/20" alt="Printer" width="50" height="50"></td>
      <td><span class="badge bg-secondary">30 Days</span></td>
      <td>1</td>
      <td>$149.99</td>
      <td><span class="badge bg-secondary">Expired</span></td>
      <td>2024-08-12</td>
      <td>2024-09-12</td>
    </tr>
    <tr>
      
      <td>Keyboard</td>
      <td>pro_01j50****7tqv1thd</td>
      <td><img src="https://picsum.photos/20/20" alt="Keyboard" width="50" height="50"></td>
      <td><span class="badge bg-success">14 Days</span></td>
      <td>5</td>
      <td>$49.99</td>
      <td><span class="badge bg-success">Active</span></td>
      <td>2024-08-15</td>
      <td>2024-08-29</td>
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
      const response = await axios.post('http://localhost:8000/api/transactions', {
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
      // You can update subscriptions or handle response here
    } catch (error) {
      console.error('Error sending invitation:', error);
    }
  }
  
  // ================ get inviated users from backend ================
  const pendingInvitations = ref([]);
  async function fetchSubscriptions() {
    try {
      const response = await axios.post('http://localhost:8000/api/pending-invitations', {
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