"use client";

import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { Client } from "@/lib/schemas/clients";
import { InputMask } from "@react-input/mask";

export default function ClientForm({ client }: { client?: Client }) {
	return (
		<>
			<div className="grid grid-cols-2 gap-3">
				<FloatingLabelInput
					id="name"
					name="name"
					label="Nombre"
					defaultValue={client?.name}
				/>
				<FloatingLabelInput
					id="lastName"
					name="lastName"
					label="Apellido"
					defaultValue={client?.lastName}
				/>
			</div>

			<div>
				<FloatingLabelInput
					id="email"
					name="email"
					label="Email"
					type="email"
					defaultValue={client?.email}
				/>
			</div>

			<div>
				<InputMask
					mask="(XXX) XXX-XXXX"
					replacement={{ X: /\d/ }}
					showMask={false}
					id="phone"
					name="phone"
					defaultValue={client?.phone}
					placeholder="Teléfono"
					className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
				/>
			</div>
		</>
	);
}
