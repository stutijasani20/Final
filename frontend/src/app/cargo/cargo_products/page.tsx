import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1 className=" mx-10 mt-5 text-4xl text-purple-800">Cargo Products</h1>
      <div className="md:container mx:10 mt-10 mb-5 md:mx-auto bg-slate-50">
        <div>
          <p className="mx-2">Cargo Products</p>
          <p className="text-slate-500 mx-2">
            Elegance air has the capability, resources, and personnel to offer
            customised cargo solutions to clients from diverse sectors. Our
            expansive global network and fully equipped operations hubs
            worldwide allow us to seamlessly take care of the unique
            requirements of our customers while ensuring that their cargo
            reaches their destination safely and securely. Use our expertise to
            see why we should be your only cargo partner of choice.
          </p>
          <p className="text-l mx-2 mt-5">Baggage as Cargo</p>
          <p className="mx-2 text-slate-500">
            <Link href={"/"} className="text-sky-700">
              Unaccompanied or personal baggage
            </Link>{" "}
            shipped as cargo can only include your apparel and movable articles,
            including musical instruments, typewriters, and sports equipment.
          </p>

          <p className="mt-5 text-m mx-2 ">Exclusions</p>
          <ul className="list-disc mx-10 mt-3 text-slate-500">
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Machinery, machine, or spare parts
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Money
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Securities
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Jewellery and watches
            </li>

            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Plate and plated ware
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Furs
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Films and cameras
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Tickets and documents
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Liquor and perfumes
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Articles of household furnishing
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Merchandise
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Salesman samples
            </li>
          </ul>
          <p className="mx-2 mt-5">Live Animals</p>
          <p className="text-slate-500 mx-2">
            Elegance Air can carry live animals as cargo subject to the
            conditions and regulations of applicable regulatory authorities. If
            you want to use this service, please comply with the current IATA
            Live Animals Regulations (LAR) and Elegance Air requirements.
          </p>
          <p className="mx-2 mt-5">Human Remains</p>
          <p className="mx-2 text-slate-500">
            Elegance Air can carry two types of human remains:
          </p>
          <ul className="list-disc mx-10 space-y-2 text-slate-500">
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>A
              human body in a coffin
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Human remains like ash in an urn
            </li>
          </ul>
          <p className="mx-2 mt-5 text-slate-600">
            To send human remains as cargo on international flights, please make
            sure you have the following documents:
          </p>
          <ul className="list-disc mt-3 mx-10 text-slate-500">
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Death certificate
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Embalming certificate (if in a coffin)
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Police certificate (mandatory if the death is unnatural)
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Cancelled Passports
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Consular certificate (from the office of the Consular of the
              nationality of the deceased)
            </li>
          </ul>
          <p className="mx-2 mt-5 text-slate-600">
            Elegance Air will accept human remains as cargo as per the following
            conditions laid down by the DGCA:
          </p>
          <ul className="list-disc mx-10 mt-2 text-slate-500">
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              If a coffin has been exhumed and proves to be intact, sound, and
              free from offensive odour on examination.
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>A
              certificate from the hospital which has embalmed the dead body
              must accompany the air waybill.
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>A
              certificate issued by a local municipal or government authority of
              the country from where the cargo is imported shall accompany the
              package. The certificate must have the deceaseds full name, age at
              the time of death, and the place, date, and cause of death. It
              should also indicate that the package confirms and has been sealed
              per the specifications prescribed.
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              The package containing the dead body shall not be opened during
              transit and should be in sound-sealed condition at arrival. It
              shall not be removed from the premises of an airport until the
              health officer has permitted its removal in writing. After the
              officer has granted the permission, the consignee shall remove and
              dispose of the cargo following the general/special instructions
              that local authorities may issue.
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Dead bodies or human remains of persons who may have died of
              yellow fever, plague, or other diseases specified by the Indian
              government from time to time, shall not be carried except for
              properly cremated ashes. However, human remains of persons who
              died due to HIV, Hepatitis-B, and Hepatitis-C can be carried.
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Cremated remains must be shipped in funeral urns efficiently
              cushioned by suitable packing against breakage.
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Non-cremated remains shall not be loaded in the same hold as pets
              or other animals.
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Non-cremated remains shall not be loaded in the same hold as food
              for human consumption when such food is not packed airtight.
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              Handling and loading of urns should be done as regular cargo.
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 mr-2 bg-sky-600 rounded-full"></span>
              NoThe pilot-in-command should be informed as per the Special Load
              Notification.
            </li>
          </ul>

          <p className="mx-2 mt-5">
            Valuable cargo
            <p className="mx-2 text-slate-500">
              The security measures within warehouses, during aircraft
              loading/unloading, customs clearance, and ground transportation
              depend entirely on the local regulations and conditions. All
              valuable cargo is handled separately from regular air cargo. Air
              India and its designated staff will ensure special service and
              protection for your valued items.
            </p>
            <p className="mx-2 mt-5">Fragile cargo </p>
            <p className="mx-2 text-slate-500">
              Elegance Air staff accepting and handling cargo will ensure and
              verify that fragile cargo is packed appropriately before loading
              into a Unit Load Device (ULD) or on an aircraft. Every fragile
              package must be affixed with a Fragile label as specified. When
              moving it on the ULD, we ensure that fragile cargo is not
              overstowed by oversized or heavy cargo.
            </p>
            <p className="mx-2 mt-5"> Cold storage</p>
            <p className="mx-2 text-slate-500">
              Temperature-sensitive healthcare products are accepted and handled
              following temperature control regulations (TCR) and other
              applicable regulations. Cargo which needs to be kept at low
              temperatures or highly perishable goods will only be allowed
              minimum storage time before shipment.
              <p className="mx-1 mt-3 text-slate-600">
                Given below is a list of cargo that would need cold storage:
              </p>
              <ul className="list-disc mt-3 mx-10 text-slate-500">
                <li>Fresh fruits and vegetables</li>
                <li>Cut flowers and orchids</li>
                <li>Meat </li>
                <li>Vaccine</li>
                <li>Some chemicals/drugs</li>
                <li>Other perishable cargo</li>
              </ul>
            </p>
            <p className="text-l text-stone-800 mx-2 mt-5">
              Outsized or overhang items (heavy cargo)
            </p>
            <p className="mx-2 mt-3 text-slate-500">
              An item loaded on two or more pallets or which, due to its size or
              weight, requires special handling/equipment for loading and
              unloading is categorised as an Overhang item. The code BIG applies
              only to loads on pallets, and floating pallets (pallets that
              occupy more than one pallet position) are to be treated as BIG. We
              specialise in carrying heavy and odd-sized cargo as we operate
              wide-body aircraft.
            </p>
          </p>

          <p className="mx-2 mt-5 text-stone-800">Perishable Goods</p>
          <p className="mx-2 mt-3 text-slate-500">
            Perishable cargo will deteriorate over time or if exposed to adverse
            temperatures, humidity, or other environmental conditions. We take
            utmost care while accepting perishable cargo for carriage by air.
            The acceptance is per the IATA PCR checklist (TCR) or equivalent.
            Additionally, when accepting and handling perishable goods, you must
            meet the current IATA Perishable Cargo Regulations (PCR), the
            carrier requirement, other applicable regulations, and conditions of
            relevant regulatory authorities such as the government of origin,
            transit, and destination etc. If shippers have specific temperature
            or ground handling requirements, we check and confirm transit and
            whether we can comply with the request.
          </p>
          <p className="mx-2 mt-5 text-tone-800">Flowers</p>
          <p className="mx-2 mt-3 text-slate-500">
            Flowers are usually wrapped in protective paper and then packed in
            cardboard boxes or wicker baskets with arrangements in place for
            smooth handling.
          </p>
          <p className="mx-2 mt-5 text-tone-800">Meat</p>
          <p className="mx-2 mt-3 text-slate-500">
            Meat is packed in waterproof material and handled as wet cargo.
            Strict hygiene conditions are maintained during all stages of
            handling meat.
          </p>
          <p className="mx-2 mt-5 text-tone-800">Hatching eggs</p>
          <p className="mx-2 mt-3 text-slate-500">
            Eggs are appropriately packed in strong fibre boards or wooden boxes
            with honeycombed separation trays to allow the stacking of parcels
            on top of each other, and arrangements are made for smooth handling.
          </p>
          <p className="mx-2 mt-5 text-tone-800">Fresh fish</p>
          <p className="mx-2 mt-3 text-slate-500">
            Appropriate packing and handling are crucial to delivering
            perishable goods in good condition. The packing must facilitate the
            integrity of the goods and the handling/storage of the goods. The
            packing must be durable enough to withstand temperature changes and
            stacking.
          </p>
          <p className="mx-2 mt-5 text-tone-800">
            Live human organs and vaccines/medical supplies
          </p>
          <p className="mx-2 mt-3 text-slate-500">
            Live human organs, blood, and lifesaving drugs/vaccines are treated
            and handled with extreme care and urgency. Short-life radioactive
            isotopes are handled with extreme urgency and in accordance with the
            current IATA guidelines.
          </p>
          <p className="mx-2 mt-5 text-tone-800">Diplomatic cargo</p>
          <p className="mx-2 mt-3 text-slate-500">
            The carriage of diplomatic mail is usually done on behalf of the
            government of India and handled by the Ministry of External Affairs
            in India and the Indian Embassy, the Consulate or Legation in other
            countries. However, diplomatic mail is also carried on behalf of
            other governments and, in all cases, is treated with top priority.
          </p>
          <p className="mx-2 mt-5 text-tone-800">Wet cargo </p>
          <p className="mx-2 mt-3 text-slate-500">
            Shipments containing liquids, or shipments that may produce liquids
            and are not subject to the IATA Dangerous Goods Regulations, shall
            be labelled ‘Wet Cargo’.
          </p>
          <p className="mx-2 mt-5 text-tone-800">
            Courier bags under air waybills
          </p>
          <p className="mx-2 mt-3 text-slate-500">
            Elegance Air carries courier bags under an air waybill. The courier
            terminals at various stations are designated at different locations.
            And at multiple stations, they are within the cargo warehouse.
          </p>
          <p className="mx-2 mt-5 text-tone-800">
            International/domestic post office mail
          </p>
          <p className="mx-2 mt-3 text-slate-500">
            Elegance Air carries postal mail on international and domestic
            flights with utmost care and priority.
          </p>
          <p className="mx-2 mt-5 text-tone-800">Dangerous Goods</p>
          <p className="mx-2 mt-3 text-slate-500">
            Elegance Air Air Operator Permit (AOP) allows us to carry certain
            dangerous goods as cargo. Also, the acceptance and transportation of
            such goods are mandatorily governed by the state and operator
            variations as defined in the current IATA DGR. The handling
            procedures for carrying dangerous goods are based on the ICAO Annex
            18 Technical Instructions, Aircraft Rules 1937, and the latest IATA
            Dangerous Goods Regulations. The same is also applicable to handling
            such goods in COMAT. All dangerous goods must be packed, meeting the
            quantity limitations per package. Please note that poor or
            inadequate packing can cause leakage/pilferage resulting in risk to
            safety, health, equipment, property, and environment. Certain
            dangerous goods are affected by changes in temperature, humidity,
            pressure, and vibrations during the flight. Hence, the shipper is
            responsible for ensuring that all dangerous goods are properly
            packed and that the packaging meets the performance standards
            detailed in the current IATA DG Regulations.
          </p>
          <p className="mx-2 mt-5 text-tone-800">Unit Load Devices (ULDs)</p>
          <p className="mx-2 mt-3 text-slate-500 pb-4">
            A Unit Load Device is either an aircraft pallet and pallet net
            combination or an aircraft container. It is a removable aircraft
            part subjected to strict civil aviation authorities requirements.
            Elegance Air owns and uses both types of ULD: <br />
            <br />
            I. Container (AKE type) <br /> <br />
            II. Pallets (PAG and PMC type) <br /> <br /> Each ULD must meet
            minimum technical specifications to ensure the safe restraint of the
            load. These specifications are published in the IATA Unit Load
            Device Regulations (ULDR). The build-up of joining load before the
            arrival of the aircraft, quick transfer of baggage/cargo from one
            aircraft to another, and greater protection of contents from weather
            hazards, handling and pilferage are some of its advantages. It also
            helps improve the logistic and financial control in addition to
            assisting in advance arrangements in marketing and sales. Elegance
            Air uses only certified ULDs (AKE, PAG and PMC). ULD AKE is a
            certified container with base dimensions of 60.4 in X 61.6 in and a
            net volume of 4.33 cu metres. These are compatible with the contour
            of all wide-body aircraft in the fleet of Elegance Air (B 777, B 787
            and B 747). It interfaces directly with aircraft loading and
            restraint systems and meets all restraint requirements without
            supplementary equipment. Hence it qualifies to be an aircraft part
            and should be maintained above the airworthiness requirements till
            it is in operation. ULD pallet: P1P (88 in X 125 in); P6P (96 in X
            125 in), PAG is a certified pallet with base dimensions 88 in X 125
            in and is compatible with Air India aircrafts restraint system with
            a max cargo height of 64. PMC is a certified pallet with base
            dimensions 96 in X 125 in and is compatible with Elegance Air
            aircrafts restraint system.
          </p>
          {/* <ul className="list-none">
            <li className="mb-2 pl-4 relative before:w-0 before:h-0 before:absolute before:border-t-4 before:border-l-4 before:border-solid before:border-blue-500 before:transform before:-rotate-45 before:top-1/2 before:left-0 before:transform before:-translate-y-1/2 before:-translate-x-2"></li>
          </ul> */}
        </div>
      </div>
    </>
  );
}
