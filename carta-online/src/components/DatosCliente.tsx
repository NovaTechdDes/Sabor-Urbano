"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "@/hooks/Useform";
import { useVenta } from "@/hooks/useVenta";

import { FiMessageSquare } from "react-icons/fi";
import { CiLight, CiLocationOn, CiPhone } from "react-icons/ci";
import { LuCreditCard, LuTruck } from "react-icons/lu";
import { BsPerson } from "react-icons/bs";

import Swal from "sweetalert2";
import { Input } from "./ui/Input";
import { enviarMensajeWhatsApp } from "@/helpers/enviarMensajeWhatsApp";

const initialForm = {
  nombre: "",
  direccion: "",
  telefono: "",
  tipo_pago: "EFECTIVO",
  envio: "false",
  vuelto: 0,
};

export const DatosCliente = () => {
  const {
    nombre,
    direccion,
    telefono,
    tipo_pago,
    envio,
    vuelto,
    observaciones,
    onInputChange,
    formState,
  } = useForm(initialForm);
  const { startActivarCliente, startCrearVenta, cerrar } = useVenta();
  const [validForm, setValidForm] = useState<boolean>(false);
  const [inputDireccion, setInputDireccion] = useState<boolean>(false);

  const direccionRef = useRef<HTMLInputElement>(null);
  const telefonoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputDireccion(envio == "false" ? false : true);
    if ((!direccion || direccion === "") && inputDireccion)
      return setValidForm(false);
  }, [envio]);

  useEffect(() => {
    if (!validarFormulario()) {
      return setValidForm(false);
    }

    setValidForm(true);
    startActivarCliente(formState);
  }, [inputDireccion]);

  useEffect(() => {
    if (!validarFormulario()) {
      return setValidForm(false);
    }

    setValidForm(true);
    startActivarCliente(formState);
  }, [formState]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    siguiente: React.RefObject<HTMLInputElement> | null,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (siguiente?.current) {
        siguiente.current?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidForm(false);
    const { ok, venta, error } = await startCrearVenta();

    if (ok) {
      setValidForm(true);
      const { isConfirmed } = await Swal.fire({
        title: "Pedido Cargado con exito",
        text: "Enviar Confirmacion por WhatsApp Por Favor",
        icon: "success",
        confirmButtonText: "Enviar",
      });

      if (isConfirmed) {
        enviarMensajeWhatsApp(venta);
        cerrar();
      }
    } else {
      await Swal.fire(
        "No se pudo generar el pedido",
        error.response?.data?.error,
        "error",
      );
    }
  };

  const validarFormulario = () => {
    if (!nombre || nombre === "") return false;
    if ((!direccion || direccion == "") && inputDireccion) return false;

    const phoneRegex = /^\d{8,15}$/;
    if (!telefono || !phoneRegex.test(telefono)) return false;

    return true;
  };

  return (
    <div className="flex flex-col space-y-4 text-left">
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
        <h3 className="text-base sm:text-lg font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider">
          Datos de Entrega (Obligatorio)
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">Completa la información para que podamos procesar tu pedido.</p>
      </div>

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        {/* Nombre */}
        <div>
          <div className="flex gap-2 items-center mb-1">
            <BsPerson className="text-primary text-base" />
            <label className="text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-200" htmlFor="nombre">
              Nombre y Apellido *
            </label>
          </div>

          <Input
            type="text"
            placeholder="Ej. Juan Pérez"
            name="nombre"
            value={nombre}
            onChange={onInputChange}
            onKeyDown={(e) =>
              handleKeyDown(
                e,
                direccionRef as React.RefObject<HTMLInputElement>,
              )
            }
          />
        </div>

        {/* Teléfono */}
        <div>
          <div className="flex gap-2 items-center mb-1">
            <CiPhone className="text-primary text-base font-bold" />
            <label className="text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-200" htmlFor="telefono">
              Teléfono de Contacto *
            </label>
          </div>

          <Input
            type="tel"
            placeholder="Ej. 3456123456"
            ref={telefonoRef as React.RefObject<HTMLInputElement>}
            name="telefono"
            value={telefono}
            onChange={onInputChange}
            onKeyDown={(e) => handleKeyDown(e, null)}
          />
        </div>

        {/* Tipo de Pago y Modalidad */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <div className="flex gap-2 items-center mb-1.5">
              <LuCreditCard className="text-primary text-base" />
              <label className="text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-200" htmlFor="tipo_pago">
                Forma de Pago *
              </label>
            </div>
            <select
              className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white p-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700/80 w-full text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
              name="tipo_pago"
              id="tipo_pago"
              value={tipo_pago}
              onChange={onInputChange}
            >
              <option value="EFECTIVO">💵 Efectivo</option>
              <option value="TRANSFERENCIA">💳 Transferencia</option>
            </select>
          </div>

          <div>
            <div className="flex gap-2 items-center mb-1.5">
              <LuTruck className="text-primary text-base" />
              <label className="text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-200" htmlFor="envio">
                Modalidad *
              </label>
            </div>
            <select
              className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white p-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700/80 w-full text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
              name="envio"
              id="envio"
              value={envio}
              onChange={onInputChange}
            >
              <option value="true">🛵 Envío a domicilio</option>
              <option value="false">🛍️ Retiro en el local</option>
            </select>
          </div>
        </div>

        {/* Dirección (si aplica envío) */}
        <div className={`${inputDireccion ? "block" : "hidden"}`}>
          <div className="flex gap-2 items-center mb-1">
            <CiLocationOn className="text-primary text-base font-bold" />
            <label className="text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-200" htmlFor="direccion">
              Dirección de Entrega *
            </label>
          </div>

          <Input
            type="text"
            placeholder="Calle, número, piso o depto."
            ref={direccionRef as React.RefObject<HTMLInputElement>}
            name="direccion"
            value={direccion}
            onChange={onInputChange}
            onKeyDown={(e) =>
              handleKeyDown(e, telefonoRef as React.RefObject<HTMLInputElement>)
            }
          />
        </div>

        {/* Observaciones */}
        <div>
          <div className="flex gap-2 items-center mb-1">
            <FiMessageSquare className="text-primary text-base" />
            <label className="text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-200" htmlFor="observaciones">
              Aclaraciones (Opcional)
            </label>
          </div>

          <textarea
            name="observaciones"
            id="observaciones"
            rows={2}
            placeholder="Ej. Sin salsa, tocar timbre 2B, abonar con billete de $10.000, etc."
            value={observaciones}
            onChange={onInputChange}
            className="w-full my-1 p-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 border border-neutral-300 dark:border-neutral-700/80 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
          ></textarea>
        </div>

        {/* Vuelto si paga en efectivo */}
        {tipo_pago === "EFECTIVO" && (
          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-3 rounded-2xl">
            <label className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 block mb-1" htmlFor="vuelto">
              ¿Con cuánto vas a pagar? (Para preparar tu cambio)
            </label>
            <Input
              placeholder="Ej. 10000"
              type="number"
              value={vuelto}
              onChange={onInputChange}
              name="vuelto"
            />
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={!validForm}
            className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-sm sm:text-base cursor-pointer transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 ${
              validForm
                ? "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
                : "bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 border border-neutral-300 dark:border-neutral-700 cursor-not-allowed opacity-75"
            }`}
          >
            {validForm
              ? "🚀 CONFIRMAR Y ENVIAR PEDIDO"
              : "⚠️ Completa los datos requeridos para continuar"}
          </button>
        </div>
      </form>
    </div>
  );
};
