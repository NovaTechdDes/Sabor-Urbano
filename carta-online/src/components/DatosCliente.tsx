"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "@/hooks/Useform";
import { useVenta } from "@/hooks/useVenta";

import { FiMessageSquare } from "react-icons/fi";
import { CiLight, CiLocationOn, CiPhone } from "react-icons/ci";
import { LuCreditCard, LuTruck } from "react-icons/lu";
import { BsPerson } from "react-icons/bs";

import Swal from "sweetalert2";
import { Input } from "./Input";
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
    <div className="flex flex-col items-starts space-y-4">
      <h3 className="text-yellow-400 text-md md:text-lg text-start">
        Datos de entregar (Obligatorio)
      </h3>
      <hr className="text-gray-700" />
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mt-3">
          <div className="flex gap-5 items-center">
            <BsPerson className="text-white" />
            <label className="text-white" htmlFor="">
              Nombre *
            </label>
          </div>

          <Input
            type="text"
            placeholder="Ingrese su nombre"
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

        <div className="mt-3">
          <div className="flex gap-2 items-center">
            <CiPhone className="text-white" />
            <label className="text-white" htmlFor="telefono">
              Telefono *
            </label>
          </div>

          <Input
            type="tel"
            placeholder="Ingrese su Telefono"
            ref={telefonoRef as React.RefObject<HTMLInputElement>}
            name="telefono"
            value={telefono}
            onChange={onInputChange}
            onKeyDown={(e) => handleKeyDown(e, null)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex gap-5 items-center">
              <LuCreditCard className="text-white" />
              <label className="text-white" htmlFor="tipo_pago">
                Tipo de Pago *
              </label>
            </div>
            <select
              className="bg-slate-700 text-white p-2 rounded-lg border border-gray-500 w-full "
              name="tipo_pago"
              id="tipo_pago"
              value={tipo_pago}
              onChange={onInputChange}
            >
              <option value="EFECTIVO">Efectivo</option>
              <option value="TRANSFERENCIA">Transferencia</option>
            </select>
          </div>

          <div>
            <div className="flex gap-5 items-center">
              <LuTruck className="text-white" />
              <label className="text-white" htmlFor="envio">
                Modalidad *
              </label>
            </div>
            <select
              className="bg-slate-700 text-white p-2 rounded-lg border border-gray-500 w-full"
              name="envio"
              id="envio"
              value={envio}
              onChange={onInputChange}
            >
              <option value="true">Envio a domicilio</option>
              <option value="false">Retiro en el Local</option>
            </select>
          </div>
        </div>

        <div className={`mt-3 ${inputDireccion ? "" : "hidden"}`}>
          <div className="flex gap-5 items-center">
            <CiLocationOn className="text-white" />
            <label className="text-white" htmlFor="direccion">
              Direccion *
            </label>
          </div>

          <Input
            type="text"
            placeholder="Ingrese su direccion"
            ref={direccionRef as React.RefObject<HTMLInputElement>}
            name="direccion"
            value={direccion}
            onChange={onInputChange}
            onKeyDown={(e) =>
              handleKeyDown(e, telefonoRef as React.RefObject<HTMLInputElement>)
            }
          />
        </div>

        <div className="mt-3">
          <div className="flex gap-5 items-center">
            <FiMessageSquare className="text-white" />
            <label className="text-white" htmlFor="observaciones">
              Observaciones (Opcional)
            </label>
          </div>

          <textarea
            name="observaciones"
            id="observaciones"
            placeholder="Ej. Sin Cebolla, Tocar Timbre, Dpto. A, etc."
            value={observaciones}
            onChange={onInputChange}
            className="my-2 text-white placeholder:text-slate-400 flex bg-slate-700 w-full gap-2 border-gray-400 border rounded-sm items-center px-2"
          ></textarea>
        </div>

        {tipo_pago === "EFECTIVO" && (
          <div>
            <label className="text-white" htmlFor="">
              ¿Con cuánto vas a pagar? ¡Así llevamos el cambio justo!
            </label>
            <Input
              placeholder="0.00"
              type="number"
              value={vuelto}
              onChange={onInputChange}
              name="vuelto"
            />
          </div>
        )}

        <hr className="text-slate-700 mt-3" />

        <div className="mt-5">
          <button
            type="submit"
            disabled={validForm ? false : true}
            className={`py-2 px-2 border border-gray-500 rounded-sm font-bold cursor-pointer w-full ${
              validForm
                ? "bg-yellow-400 text-black hover:bg-yellow-500"
                : "bg-gray-700 text-gray-500"
            }`}
          >
            {validForm
              ? "Confirmar Pedido"
              : "Complete todos los datos para continuar"}
          </button>
        </div>
      </form>
    </div>
  );
};
