"use client";

import AddCouponForm from "@/components/coupons/AddCouponForm";
import React from "react";

export default function AddCouponPage() {
  return (
	<div className="max-w-3xl mx-auto">
	  <h1 className="text-3xl font-bold mb-4 md:mb-8">Cupones</h1>

	  <AddCouponForm />
	</div>
  );
}
