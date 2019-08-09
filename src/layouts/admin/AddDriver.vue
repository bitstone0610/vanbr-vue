<template>
  <div class="register container main-app-section-sm">
    <Card class="mx-auto">
      <div class="title text-center">Add Driver</div>
      <form>
        <div class="form-group main-app-section-xs">
          <label for="name">Name:</label>
          <input
            v-validate="'required|alpha_spaces'"
            name="name"
            type="text"
            class="form-control"
            placeholder="First Name"
            v-model="name"
            id="name"
          >
          <p class="error-msg">{{ errors.first('name') }}</p>
        </div>
        <div class="form-group main-app-section-xs">
          <label for="dob">Date of Birth:</label>
          <input
            v-validate="'required'"
            name="dob"
            type="date"
            class="form-control"
            id="dob"
            v-model="dob"
          >
          <p class="error-msg">{{ errors.first('dob') }}</p>
        </div>
        <div class="form-group main-app-section-xs">
          <label for="dob">Phone Number:</label>
          <input
            v-validate="'numeric|length:10|required'"
            name="mobile"
            type="number"
            placeholder="Phone Number"
            class="form-control"
            id="mobile"
            v-model="mobile_no"
          >
          <p class="error-msg">{{ errors.first('mobile') }}</p>
        </div>
        <div class="form-group main-app-section-xs">
          <label>Gender:</label>
          <select v-model="gender" class="form-control">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="form-group main-app-section-xs">
          <label for="email">Email:</label>
          <input
            v-validate="'required|email'"
            name="email"
            type="email"
            class="form-control"
            placeholder="Email"
            id="email"
            v-model="email"
          >
          <p class="error-msg">{{ errors.first('email') }}</p>
        </div>
        <div class="form-group main-app-section-xs">
          <label>Address:</label>
          <input
            type="text"
            class="form-control"
            v-model="address"
            placeholder="Address"
            id="address"
          >
        </div>
        <div class="form-group main-app-section-xs">
          <label>Car Model:</label>
          <input
            type="text"
            class="form-control"
            v-model="carModel"
            placeholder="Car Model"
            id="model"
          >
        </div>
        <div class="form-group main-app-section-xs">
          <label>Car Number:</label>
          <input
            v-validate="'required|alpha_num'"
            name="car"
            type="text"
            class="form-control"
            v-model="carNumber"
            placeholder="Car Number"
            id="number"
          >
          <p class="error-msg">{{ errors.first('car') }}</p>
        </div>
        <div class="form-group main-app-section-xs">
          <label>License Number:</label>
          <input
            v-validate="'required|alpha_num'"
            name="license"
            type="text"
            class="form-control"
            v-model="licenseNumber"
            placeholder="License Number"
            id="license"
          >
          <p class="error-msg">{{ errors.first('license') }}</p>
        </div>
        <div class="form-group main-app-section-xs">
          <label>License Expiry Date:</label>
          <input
            type="date"
            class="form-control"
            v-model="licenseExpiry"
            placeholder="License Expiry"
            id="expiry"
          >
        </div>
        <div class="form-group main-app-section-xs">
          <label>Insurance Number:</label>
          <input
            v-validate="'required|alpha_num'"
            name="insurance"
            type="text"
            class="form-control"
            v-model="insuranceNo"
            placeholder="Insurance Number"
            id="insuranceNo"
          >
          <p class="error-msg">{{ errors.first('insurance') }}</p>
        </div>
        <div class="form-group main-app-section-xs">
          <label>Insurance Expiry Date:</label>
          <input
            type="date"
            class="form-control"
            v-model="insuranceExpiry"
            placeholder="Insurance Expiry Date"
            id="insuranceExpiry"
          >
        </div>

        <div class="form-group main-app-section-xs">
          <label>Car Type:</label>
          <select v-model="carId" class="form-control">
            <option value="1">Sedan</option>
            <option value="2">Mini Van</option>
          </select>
        </div>

        <div class="form-group main-app-section-xs">
          <label>Driver Image:</label>
          <input
            type="file"
            class="form-control"
            @change="onDriverFileChange"
            ref="files"
            id="files"
            name="driverimage"
            accept="image/png, image/jpg, image/jpeg, image/svg"
          >
        </div>
        <div v-if="driverImageUrl" class="form-group main-app-section-sm" style="text-align: center;">
          <img :src="driverImageUrl" alt="DriverImage" style="max-width: 20%;">
        </div>
        <!-- <div class="form-group main-app-section-xs">
            <label>Driver's Car Image:</label>
            <input type="file" class="form-control" @change="onCarFileChange" ref="driverCarImage" id="driverCarImage" name="driverCarImage" accept="image/png, image/jpg, image/jpeg, image/svg"/>
        </div>-->
        <div class="form-group main-app-section-sm">
          <button
            type="submit"
            class="btn btn-custom btn-block"
            id="submit"
            @click="addDriver"
          >Submit</button>
        </div>
      </form>
    </Card>
  </div>
</template>

<script>
/* eslint-disable */
import Routes from "@/router/routes";
import Card from "@/components/Card";
import { AppURL } from "@/constants";

export default {
  name: "AddDriver",
  components: { Card },
  data() {
    return {
      AppURL,
      Routes,
      name: "Driver000",
      dob: "1988-09-22",
      gender: "Male",
      mobile_no: "1234567890",
      email: "driver@gmail.com",
      address: "34 Park",
      carId: "aaaa",
      carModel: "TOTO",
      carNumber: "2435sd",
      licenseNumber: "234234",
      licenseExpiry: "2019-09-11",
      insuranceNo: "3453546",
      insuranceExpiry: "2020-11-12",
      driverImage: "",
      driverCarImage: "",
      files: "",
      driverImageUrl: null,
    };
  },
  methods: {
    async onCarFileChange(e) {
      const carImage = e.target.files || e.dataTransfer.files;
      this.driverCarImage = carImage[0];
      console.log("onCarFileChange", this.driverCarImage);
    },
    onDriverFileChange(e) {
      const reader = new FileReader();
      reader.onload = e => this.driverImage = e.target.result;
      reader.readAsDataURL(e.target.files[0]);
      this.driverImage = e.target.files[0];
      this.driverImageUrl = URL.createObjectURL(this.driverImage);
    },
    async addDriver(event) {
      event.preventDefault();
      try {
        document.querySelector("#submit").disabled = true;
        const data = {
          name: this.name,
          dob: this.dob,
          gender: this.gender,
          mobile_no: this.mobile_no,
          email: this.email,
          address: this.address,
          car_id: this.carId,
          car_model: this.carModel,
          city: this.city,
          car_number: this.carNumber,
          license_number: this.licenseNumber,
          license_expiry_date: this.licenseExpiry,
          insurance_number: this.insuranceNo,
          insurance_expiry_date: this.insuranceExpiry,
          driver_image: this.driverImage,
          car_image: this.driverCarImage
        };
        console.log("Request data . . . .", data);

        const response = await this.axios
          .post(`${this.AppURL}/admin/driver/create`, data, {
            headers: {
              // "Content-Type": "multipart/form-data"
            }
          })
          .then(() => {
            console.log("Success. . . . ")
            alert("Successfully Driver Added");
          })
          .catch(error => console.log(error));

        console.log(response)

        // fetch(`${this.AppURL}/admin/driver/create`, {
        //   method: "POST",
        //   body: data
        // }).then(response => {
        //   console.log(response);
        //           alert("Successfully Driver Added");

        // });

      } catch (e) {
        if (e.response) {
          this.checkError(e.response.status, e.response.data.message);
        }
      } finally {
        document.querySelector("#submit").disabled = false;
      }
    },
    uploadImage(id) {
      console.log("here");
      const formData = new FormData();

      // formData.append('file', this.file); -for single file
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        formData.append("files[" + i + "]", file);
      }
      console.log(formData);
      axios
        .post(
          `${this.AppURL}/admin/upload/image`,
          {
            media: formData,
            resource_id: id,
            tags: image,
            resource_type: driver
          },
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    }
  }
};
</script>

<style scoped>
</style>
