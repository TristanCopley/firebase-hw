<script lang='ts'>

    import { database } from '../firebase';
    import { doc, onSnapshot, setDoc } from "firebase/firestore";
    import { onDestroy } from 'svelte';

    export let data: {settings: {name: string, value: string}[]} | null;

    let settings = data ? data.settings : [] as {name: string, value: string}[];

    let db = database();

    const unsub = onSnapshot(doc(db, 'settings/settings'), (doc) => {
        
        let data = doc.data() as {settings: {name: string, value: string}[]} | null;

        if (data) settings = data.settings;

    });

    onDestroy(() => {
        unsub();
    });

    async function updateSettings() {

        await setDoc(doc(db, 'settings', 'settings'), {
            settings: settings
        });

    }

</script>


<div class="bg-base-300 w-screen min-h-screen p-8 flex flex-col justify-center gap-8">
	<div class="flex gap-8 justify-center self-center">
		<div class="bg-base-200 w-96 h-64 self-center justify-center flex">
			<span class="self-center text-3xl w-fit h-fit text-center px-8 btn btn-neutral"
				>{settings[0].value}</span
			>
		</div>
		<div class="bg-base-200 w-96 h-64 self-center flex flex-col justify-center">
			<div class="flex flex-col justify-center self-center gap-8">
				<div class="form-control self-center">
					<label class="label">
						<span class="label-text">Enter number:</span>
					</label>
					<label class="input-group">
						<input
							type="text"
							placeholder="ex: 0.01"
							class="input input-bordered"
							bind:value={settings[0].value}
						/>
						<button class="btn btn-neutral" on:click={updateSettings}> Write </button>
					</label>
				</div>
				<button class="btn btn-neutral" > Read </button>
			</div>
		</div>
	</div>
	<div class="flex gap-8 justify-center self-center">
		<div class="max-w-3xl h-fit self-center">
			<div class="overflow-x-auto">
				<table class="table table-zebra w-full">
					<thead>
						<tr>
							<th />
							<th>Option</th>
							<th>Value</th>
							<th>Update</th>
						</tr>
					</thead>
					{#each settings as setting, i}
						<tbody>
							<tr>
								<th>{i}</th>
								<td>{setting.name}</td>
								<td>
									<input
										type="text"
										placeholder="ex: 0.01"
										class="input input-bordered"
										bind:value={setting.value}
									/>
								</td>
								<td>
									<button class="btn btn-neutral" 
                                    on:click={updateSettings}>
										Update
									</button>
								</td>
							</tr>
						</tbody>
					{/each}
				</table>
			</div>
		</div>
	</div>
</div>