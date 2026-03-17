import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function Slider() {
  return (
    <div className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="https://lh3.googleusercontent.com/rd-gg-dl/AOI_d_8-EvCAT_NvELRA4KOeTGRf2VB_rGGRAvUGSLvQLej510vH4iki8DZGpKJ7uF2Yl7BP7O7jO--r5_t2rqGkDwKm--mlIH7s8z2id8tqy05xdEKG-iuoGcfhtD3PZz5dMpSLOUST2pN6Ryrnkiwr5XFOS0FbxXhlg7Xbh9SBA-yUR4lcOh1iyYoYXZRhC-UOIHEn4edk6M57G7f3qs2FU5GJVEXhch7skFXTV1ipyq4KNuWmnm2BZ65-8mJhtAxwciKZsAGjFKHAuyU3NTvxpGbGm6bKNfLCAKWntURRaCEi76GjYc-D5ngDIJbD9VgS0vLVCnBHxWRkUeDeGNebddx3YfG5-475wwRlJMR4n1Nwj0T2Ul2a4mDnboUAcKABwF_oD_qWvUBRACskBxkS5b_HtrJoafjIGic42DbW4vZT5CE2ZBJQIz0k2qTBXqKWH5L-CNr6Hjt5iKndOGHqTgFq-FukDCxz9u-Sjo494kmlMkvyyWt6EE7vU7Q6h91vnpEMFtF5JdL1j7DshsbXV0c600NxkEKKsk_lZx01CLkmCOpxSHaSjHXEXQgGpYk2UzVsBUhhygts1c4Hf0KhIoIFqH9KboTk4IvFyepZAtSIGGTZ0yKaAo5IB_NCt5bCu_2tmoMzAlhUPmv9gKYiifKlMy0zjJ3SEOfOgfEqAnWVERt3Rlh3oihiV9zGVWaa9VJZ7P-2azHlsHv1gMBwOYTSbgA9MT1bXagOJ8E4Eunqn8GTMvwM_L2cz2EOSshJef5RP1D-BIop7-eUkUwqwh6yAVFcLfpSBjJVzmnIqbFQXU_H57RntX4JDjqh8x-5yMc2XFSb6rj7Rv0hGzf2YzmLppXkGZxdqBl_iR6_WDfDuws5c2vOevNC-h9baC0IbRCh6c_R2I6rG3DIcmnjNGNoUMoGynKHnkYu0DYI5DSFD9qNwy6h3JVyqmKVghuq4FF-OE4tfIL-NolX4EcDbx_7ckfu21v6ioHcdvgdDbZN3rh-eX1GA-NHsSUjhVjfxp8hoWl3-ZhYSgpYKCe5DtHsmJtGy4tbYBHsqxSp2XYPaWobS09qIGraEp6bESl7aZoNsfQdSPSO4VNPhSgl7rIGGjJgkgKbCDrbXHHrNKUIKOKEQsjLhdKsXOM3d1KokO6c9gtcMw-NBI9BLELEEX292oNFR2wd7GVprUvnYlX0Z04g8vyV0cXighdMzZXbwZgYkKy-KLENFND9nqRNeiV7VJmLh0gyrQKxs-vMZhu6WSs86I66idzBH0L2=s1600-rj"
          alt="Logistics and supply chain"
          fill
          className="object-cover object-center transform scale-105"
          priority
        />
        {/* Sleek Gradient Overlay to mimic the reference perfectly */}
        <div className="absolute inset-0 bg-linear-to-r from-gray-950/90 via-gray-900/60 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-t from-gray-950/40 via-transparent to-transparent"></div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
            Welcome to GS1 Saudi Arabia
          </h1>
          
          {/* Bright Orange/Red Accent Line identical to reference */}
          <div className="w-[140px] h-1 bg-[#D94F2B] mb-8"></div>

          <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed font-light">
            Empower your business with a globally recognized digital identity for your products. Acquire official Barcodes, 2D QR Codes, and Global Location Numbers (GLN) from GS1 Saudi Arabia to ensure seamless supply chain connectivity, regulatory compliance, and consumer trust locally and worldwide.
          </p>
          
          <div>
            <Button size="lg" className="bg-[#D94F2B] hover:bg-[#C2411F] text-white font-medium text-[16px] px-8 py-6 rounded-md shadow-lg transition-colors w-full sm:w-auto">
              Explore more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;