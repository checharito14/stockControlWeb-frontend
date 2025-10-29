import React from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

type ConfirmDialogProps = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	description: string;
	isPending?: boolean;
	children: React.ReactNode;
};

export default function ConfirmDialog({
	isOpen,
	onClose,
	title,
	description,
	children,
	isPending,
}: ConfirmDialogProps) {
	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-150 ${
				isOpen ? "opacity-100" : "opacity-0 pointer-events-auto" 
			}`}
			tabIndex={-1}
		>
			{/* Fondo oscuro */}
			<div
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onClick={!isPending ? onClose : undefined}
			/>

			{/* Contenedor */}
			<div
				className={`relative bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all duration-150 ${
					isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
				}`}
			>
				{/* Header */}
				<div className="flex items-center justify-between p-6 pb-4">
					<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
					{!isPending && (
						<button
							onClick={onClose}
							className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md p-1 transition-colors"
						>
							<X size={20} />
						</button>
					)}
				</div>

				{/* Content */}
				<div className="px-6 pb-4">
					<p className="text-sm text-gray-600">{description}</p>
				</div>

				{/* Actions */}
				<div className="flex items-center justify-end space-x-3 p-6 pt-4 bg-gray-50 rounded-b-lg">
					<Button
						variant="outline"
						onClick={onClose}
						disabled={isPending}
						className="min-w-[80px]"
					>
						Cancelar
					</Button>

					{children}
				</div>
			</div>
		</div>
	);
}
