<script>
    import CardContent from "$lib/components/ui/card/card-content.svelte";
import Card from "$lib/components/ui/card/card.svelte";
import * as Accordion from "$lib/components/ui/accordion/";
    import { Banknote, Bitcoin, Settings, Shield, ShieldCheckIcon, Skull } from "lucide-svelte";
    import GeneralSettings from "./GeneralSettings.svelte";
    import DeleteStuff from "../dangerzone/DeleteStuff.svelte";
    import ManipulateCounters from "../dangerzone/ManipulateCounters.svelte";
    import BackupSettings from "./BackupSettings.svelte";
    import SecuritySettings from "./SecuritySettings.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import CurrencySettings from "./CurrencySettings.svelte";
    import EcashSettings from "./EcashSettings.svelte";
</script>

<div class="flex flex-col gap-2 w-80">

            <Accordion.Root  type="single">
                <Accordion.Item value="item-1">
                    <Accordion.Trigger><span class="flex gap-2"><Settings></Settings> General settings</span></Accordion.Trigger>
                    <Accordion.Content>
                      <GeneralSettings>
                      </GeneralSettings>
                    </Accordion.Content>
                  </Accordion.Item>
                  <Accordion.Item value="item-2">
                    <Accordion.Trigger><span class="flex gap-2"><ShieldCheckIcon></ShieldCheckIcon> Backup and security</span></Accordion.Trigger>
                    <Accordion.Content>
                        <div class="flex flex-col gap-10">
                            <div class="flex gap-4 flex-col">
                                <p class="font-bold">
                                    Encryption
                                </p>
                                <SecuritySettings></SecuritySettings>
                            </div>
                            <div class="flex flex-col gap-4">
                                <p class="font-bold">
                                    Backup & restore
                                </p>
                                    <BackupSettings></BackupSettings>
                            </div>
                        </div>
                    </Accordion.Content>
                  </Accordion.Item>
                  <Accordion.Item value="item-3">

                    <Accordion.Trigger><span class="flex gap-2"><Bitcoin></Bitcoin>Currencies & Units</span></Accordion.Trigger>
                    <Accordion.Content>
                      <CurrencySettings></CurrencySettings>
                    </Accordion.Content>
                  </Accordion.Item>
                  <Accordion.Item value="item-4">

                    <Accordion.Trigger><span class="flex gap-2"><Banknote></Banknote> Cashu tokens</span></Accordion.Trigger>
                    <Accordion.Content>
                      <EcashSettings></EcashSettings>
                    </Accordion.Content>
                  </Accordion.Item>
                  <Accordion.Item value="item-99">
                    <Accordion.Trigger><span class="flex gap-2 text-destructive"><Skull></Skull> Danger zone</span></Accordion.Trigger>
                    <Accordion.Content>
                       <div class="flex flex-col gap-5">
                           <div class="flex flex-col gap-2">
                               <p class="font-bold">
                                   Manipulate restore counters
                                </p>
                                <ManipulateCounters></ManipulateCounters>
                            </div>
                            <div class="flex flex-col gap-2">
                                <p class="font-bold">
                                    Delete Wallet
                                </p>
                                <DeleteStuff></DeleteStuff>
                            </div>
                        </div>
                    </Accordion.Content>
                  </Accordion.Item>
                  
              </Accordion.Root>

    
</div>