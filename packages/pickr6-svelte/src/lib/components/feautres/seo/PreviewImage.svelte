<script lang="ts">
	const version = PKG.version;
</script>

<div
	style="
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: linear-gradient(to bottom, #dbf4ff, #fff1f1);
  font-size: 60px;
  letter-spacing: -2px;
  font-weight: 700;
  text-align: center;
"
>
	<div
		style="
    background-image: linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216));
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  "
	>
		PickR6
	</div>
	<div
		style="
    background-image: linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128));
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  "
	>
		{version}
	</div>
</div>
