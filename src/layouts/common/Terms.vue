<template>
        <div class="terms container">
          <div class="row">
            <div class="col-md main-app-section-sm">
              <Card class="mx-auto">
                    <p>
                            ANY PARTICIPATION IN THIS SERVICE (VANBR) WILL CONSTITUTE ACCEPTANCE OF THIS AGREEMENT. IN ADDITION, WHEN USING
                            VANBR, YOU WILL BE SUBJECT TO ANY POSTED GUIDELINES OR RULES APPLICABLE TO THIS SERVICE. IF YOU DO NOT AGREE TO
                            THE ABOVE PLEASE DO NOT USE VANBR.
                          </p>
                    
                          <p>
                            VanBr collects your personal information when you voluntarily provide it to us. We will not disclose any
                            personal information to any third party unless (1) you have authorized us to do so; (2) we are legally required
                            to do so.
                          </p>
                    
                          <p>
                            The Site (VanBr.ca) and its original content, features, and functionality are owned by Quoc Sinh Hoang and are
                            protected by international copyright, trademark, patent, trade secret, and other intellectual property or
                            proprietary rights laws.
                          </p>
                    
                          <p>
                                VanBr have the right to immediately terminate these terms or any services provided to you at any time without
                                reason.
                          </p>
                    
                    
                          <h2>Driver</h2>
                    
                    
                          <p>To drive for VanBr all drivers must meet all of the requirement set out by VanBr as well as requirements set out
                          by city law (Specifically in regards to Driver for Hire - Driver By-Law No 2017-024 section 16).</p>
                    
                    
                          <p>VanBr does not accept responsibility or liability for anything that may happen while a driver is driving for the
                          company. The driver accepts full responsibility, as they are third party contractors.</p>
                    
                          <p>VanBr does not accept responsibility or liability for anything that may happen to the driver while driving for
                          the company. The driver accepts full responsibility, as they are third party contractors.</p>
                    
                    
                          <p>A driver for VanBr must supply their own equipment necessary for driving and accepting jobs. (Including but not
                          limited to, smartphone, data, charger, vehicle, etc.)</p>
                    
                          <p>Drivers are solely responsible for their own gas, vehicle and equipment maintenance.</p>
                    
                          <p>All vehicles used to drive for VanBr must meet basic safety standards.</p>
                    
                          <p>VanBr drivers must not accept payment directly from the customer. All monies will go from the customer to VanBr,
                          and from VanBr to the driver.</p>
                    
                    
                          <p>I have read and agree to the terms and conditions.</p>
                    
              </Card>
            </div>
          </div>
        </div>
    </template>
    
    <script>
/* eslint-disable */
import Routes from "@/router/routes";
import Card from "@/components/Card";
import { AppURL } from "@/constants";

export default {
  name: "Terms",
  components: { Card },
  
  data() {
    return {
      Routes,
    };
  },
};
</script>
    
    <style lang="scss" scoped>
.car-logo {
  border-radius: 50%;
  box-shadow: 0 0px 8px 0 #ccc;
  padding: 8px;
  background-color: #f8f8f8;

  img {
    width: 52px;
  }
}

.car-details {
  font-size: 18px;
  padding: 4px 20px;
}
</style>
    